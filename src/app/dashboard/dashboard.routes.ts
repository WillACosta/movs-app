import { DetailComponent } from './../moviments/detail/detail.component';
import { MovimentsComponent } from './../moviments/moviments.component';
import { StatisticComponent } from './../moviments/statistic/statistic.component';
import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
  { path: '', component: StatisticComponent },
  { path: 'movs', component: MovimentsComponent },
  { path: 'detail', component: DetailComponent },
];
