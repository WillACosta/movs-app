import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { ErpComponent } from './erp.component';
import { StatisticComponent } from './statistic/statistic.component';
import { DetailComponent } from './detail/detail.component';
import { OrderMovsPipe } from '../pipes/order-movs.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';
import { StoreModule } from '@ngrx/store';
import { entradaSaidaReducer } from './entrada-saida.reducer';

@NgModule({
  declarations: [
    DashboardComponent,
    ErpComponent,
    StatisticComponent,
    DetailComponent,
    OrderMovsPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    RouterModule,
    SharedModule,
    DashboardRoutesModule,
    StoreModule.forFeature('enSai', entradaSaidaReducer )
  ]
})
export class ErpModule { }
