import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  /**
   *
   */
  constructor(private authS: AuthService, private router: Router) {}

  /**
   * Retorna um valor booleano indicando se a rota está disponível
   * para qualquer usuário
   */
  canActivate(): Observable<boolean> {
    return this.authS.isAuth()
    .pipe(
      /**
       * tap espera-se um efeito secundário
       */
      tap((estado) => {
        if (!estado) this.router.navigate(['/login']);
      })
    );
  }
}
