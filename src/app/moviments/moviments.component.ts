import { Subscription } from 'rxjs';
import { isLoading, stopLoading } from '../shared/ui.actions';
import { EntradaSaidaService } from '../services/entrada-saida.service';
import { EntradaSaida } from '../models/entradas-saidas.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';

@Component({
  selector: 'app-moviments',
  templateUrl: './moviments.component.html',
  styles: [],
})
export class MovimentsComponent implements OnInit, OnDestroy {
  entradaForm: FormGroup;
  tipo: string = 'ENTRADA';
  loading: boolean = false;

  loadingSubs: Subscription;

  constructor(
    private fb: FormBuilder,
    private esServ: EntradaSaidaService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.loadingSubs = this.store.select('ui').subscribe(({ isLoading }) => {
      this.loading = isLoading;
    });

    this.entradaForm = this.fb.group({
      descricao: ['', Validators.required],
      valor: ['', Validators.required],
    });
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

  onSubmit() {
    if (this.entradaForm.invalid) return;

    this.store.dispatch(isLoading());

    /**
     * Usar a desestruturação para obter as informações necessárias
     */
    const { descricao, valor } = this.entradaForm.value;

    const entradaSaida = new EntradaSaida(descricao, valor, this.tipo);
    this.esServ
      .criarRegistro(entradaSaida)
      .then(() => {
        this.store.dispatch(stopLoading());
        this.entradaForm.reset;
        Swal.fire('Movimentação criada!', descricao, 'success');
      })
      .catch((err) => {
        this.store.dispatch(stopLoading());
        Swal.fire('Error', err.message, 'error');
      });
  }
}
