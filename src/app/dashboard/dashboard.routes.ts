import { DetailComponent } from './../erp/detail/detail.component';
import { ErpComponent } from './../erp/erp.component';
import { StatisticComponent } from './../erp/statistic/statistic.component';
import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
  { path: '', component: StatisticComponent },
  { path: 'erp', component: ErpComponent },
  { path: 'detail', component: DetailComponent },
];
