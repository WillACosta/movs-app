import { Store } from '@ngrx/store';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';

import Swal from 'sweetalert2';
import { isLoading, stopLoading } from 'src/app/shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit, OnDestroy {
  formRegistro: FormGroup;
  loading: boolean = false;
  uiSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.formRegistro = this.fb.group({
      nome: ['', Validators.required],
      email: ['', Validators.email],
      senha: ['', Validators.required],
    });

    this.uiSubscription = this.store.select('ui').subscribe((ui) => {
      this.loading = ui.isLoading;
    });
  }

  onSubmit() {
    if (this.formRegistro.invalid) return;

    this.store.dispatch(isLoading());

    // Swal.fire({
    //   title: 'Aguarde ...',
    //   onBeforeOpen: () => {
    //     Swal.showLoading();
    //   },
    // });

    const { nome, email, senha } = this.formRegistro.value;

    this.authService
      .criarUsuario(nome, email, senha)
      .then((value) => {
        console.log(value);
        // Swal.close();
        this.store.dispatch(stopLoading());
        this.router.navigate(['/']);
      })
      .catch((err) => {
        Swal.fire('Oops...', err.message, 'error');
        this.store.dispatch(stopLoading());
      });
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe(); // Destruir a inscrição após o uso
  }
}
