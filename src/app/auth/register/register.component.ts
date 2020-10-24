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
  styleUrls: ['./register.component.css'],
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

    const { nome, email, senha } = this.formRegistro.value;

    this.authService
      .criarUsuario(nome, email, senha)
      .then((value) => {
        this.store.dispatch(stopLoading());
        this.router.navigate(['/']);
      })
      .catch((err) => {
        if (
          err.message.includes(
            'The email address is already in use by another account'
          )
        )
          Swal.fire(
            'Oops...',
            'Este endereço de email já é utilizado!',
            'error'
          );
        else if (err.message.includes('least 6 characters'))
          Swal.fire(
            'Oops...',
            'A senha deve conter no minímo 6 caracteres!',
            'error'
          );
        else Swal.fire('Oops...', err.message, 'error');
        this.store.dispatch(stopLoading());
      });
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }
}
