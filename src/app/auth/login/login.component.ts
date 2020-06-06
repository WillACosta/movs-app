import { isLoading, stopLoading } from './../../shared/ui.actions';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

import Swal from 'sweetalert2';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit, OnDestroy {
  formLogin: FormGroup;
  loading: boolean = false;
  uiSubscription: Subscription;

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

    /**
     * Inscrever-se no ui reducer e atribuir a uma variável
     * para controlar futuramente
     */
    this.uiSubscription = this.store.select('ui').subscribe((ui) => {
      this.loading = ui.isLoading;
    });
  }

  onSubmit() {
    if (this.formLogin.invalid) return;

    //Adicionar login animation

    this.store.dispatch(isLoading());

    // Swal.fire({
    //   title: 'Aguarde ...',
    //   onBeforeOpen: () => {
    //     Swal.showLoading();
    //   },
    // });

    const { email, senha } = this.formLogin.value;

    this.authS
      .login(email, senha)
      .then((signed) => {
        console.log(signed);
        // Swal.close();
        this.store.dispatch(stopLoading());
        this.router.navigate(['/']);
      })
      .catch((err) => {
        Swal.fire('Oops...', err.message, 'error');
        this.store.dispatch(stopLoading());
      });
  }

  ngOnDestroy(){
    this.uiSubscription.unsubscribe(); // Destruir a inscrição após o uso
  }
}
