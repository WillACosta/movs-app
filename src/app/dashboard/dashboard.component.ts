import { setItems } from './../erp/entrada-saida.action';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { EntradaSaidaService } from '../services/entrada-saida.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit, OnDestroy {
  userSubs: Subscription;
  movimentacaoSubs: Subscription;
  constructor(
    private store: Store<AppState>,
    private esServ: EntradaSaidaService
  ) {}

  ngOnInit(): void {
    this.userSubs = this.store
      .select('auth')
      /**
       * Manipular os objetos do observable
       * A inscrição será executada apenas quando o usuário estiver
       * disponível (filter)
       */
      .pipe(filter((auth) => auth.user != null))
      .subscribe(({ user }) => {
        console.log(user);
        this.movimentacaoSubs = this.esServ
          .initEntradaSaidaListener(user.uid)
          .subscribe((entradasSaidas) => {
            this.store.dispatch(setItems({ items: entradasSaidas }));
          });
      });
  }

  ngOnDestroy() {
    this.movimentacaoSubs?.unsubscribe();
    this.userSubs?.unsubscribe();
  }
}
