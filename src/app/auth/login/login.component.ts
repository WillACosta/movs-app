import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { isLoading, stopLoading } from './../../shared/ui.actions';
import { AuthService } from './../../services/auth.service';

import Swal from 'sweetalert2';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  formLogin: FormGroup;
  uiSubscription: Subscription;

  loading: boolean = false;

  email: string;
  senha: string;

  constructor(
    private fb: FormBuilder,
    private authS: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: ['', Validators.email],
      senha: ['', Validators.required],
    });

    /** Inscrever-se no uiSubscription e posteriormente remover inscrição */
    this.uiSubscription = this.store.select('ui').subscribe((ui) => {
      this.loading = ui.isLoading;
    });
  }

  onSubmit() {
    if (this.formLogin.invalid) return;

    this.store.dispatch(isLoading());

    const { email, senha } = this.formLogin.value;

    this.authS
      .login(email, senha)
      .then((signed) => {
        console.log(signed);
        this.store.dispatch(stopLoading());
        this.router.navigate(['/']);
      })
      .catch((err) => {
        Swal.fire(
          'Oops...',
          'Ocorreu um erro na sua autenticação, verifique seu email e senha por favor!',
          'error'
        );
        this.store.dispatch(stopLoading());
      });
  }

  ngOnDestroy() {
    this.uiSubscription.unsubscribe(); //Remover inscrição
  }
}
