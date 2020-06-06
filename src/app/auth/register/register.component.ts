import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit {
  formRegistro: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formRegistro = this.fb.group({
      nome: ['', Validators.required],
      email: ['', Validators.email],
      senha: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.formRegistro.invalid) return;

    Swal.fire({
      title: 'Aguarde ...',
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    const { nome, email, senha } = this.formRegistro.value;

    this.authService
      .criarUsuario(nome, email, senha)
      .then((value) => {
        console.log(value);
        Swal.close();
        this.router.navigate(['/']);
      })
      .catch((err) => {
        Swal.fire('Oops...', err.message, 'error');
      });
  }
}
