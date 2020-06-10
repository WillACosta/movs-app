import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Usuario } from './../../models/user.model';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit, OnDestroy {
  usuarioAtivo: string;
  userSubs: Subscription;

  constructor(
    private auth: AuthService,
    private router: Router,
    private Store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.userSubs = this.Store.select('auth')
      .pipe(filter(({ user }) => user != null))
      .subscribe(({ user }) => {
        this.usuarioAtivo = user.nome;
      });
  }

  ngOnDestroy() {
    this.userSubs.unsubscribe();
  }

  logout() {
    this.auth.logout().then(() => this.router.navigate(['/login']));
  }
}
