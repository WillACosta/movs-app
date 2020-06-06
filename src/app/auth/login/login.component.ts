import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authS: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: ['', Validators.email],
      senha: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.formLogin.invalid) return;

    //Adicionar login animation

    Swal.fire({
      title: 'Aguarde ...',
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    const { email, senha } = this.formLogin.value;

    this.authS
      .login(email, senha)
      .then((signed) => {
        console.log(signed);
        Swal.close();
        this.router.navigate(['/']);
      })
      .catch((err) => {
        Swal.fire('Oops...', err.message, 'error');
      });
  }
}
