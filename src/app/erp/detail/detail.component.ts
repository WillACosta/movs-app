import Swal from 'sweetalert2';

import { EntradaSaida } from './../../models/entradas-saidas.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { EntradaSaidaService } from 'src/app/services/entrada-saida.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: [],
})
export class DetailComponent implements OnInit, OnDestroy {
  movimentacoes: EntradaSaida[] = [];
  movsSubs: Subscription;

  constructor(
    private store: Store<AppState>,
    private enS: EntradaSaidaService
  ) {}

  ngOnInit(): void {
    this.movsSubs = this.store.select('enSai').subscribe(({ items }) => {
      this.movimentacoes = items;
    });
  }

  ngOnDestroy() {
    this.movsSubs.unsubscribe();
  }

  excluir(uid: string) {
    this.enS
      .excluirMovimentacao(uid)
      .then(() => {
        Swal.fire('Excluído', 'Item excluído', 'success');
      })
      .catch((err) => {
        Swal.fire('Erro"', err.message, 'error');
      });
  }
}
