import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
})
export class NavbarComponent implements OnInit, OnDestroy {
  usuarioAtivo: string;
  userSubs: Subscription;

  constructor(private Store: Store<AppState>) {}

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
}
