import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routes';

const rotasFilhas = [
  {
    path: '',
    component: DashboardComponent,
    children: dashboardRoutes,
    // canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(rotasFilhas)],
  exports: [RouterModule]
})
export class DashboardRoutesModule {}
