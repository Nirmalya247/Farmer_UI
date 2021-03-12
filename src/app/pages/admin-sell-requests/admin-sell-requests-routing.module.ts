import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminSellRequestsPage } from './admin-sell-requests.page';

const routes: Routes = [
  {
    path: '',
    component: AdminSellRequestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminSellRequestsPageRoutingModule {}
