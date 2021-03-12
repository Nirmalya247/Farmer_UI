import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MySellRequestsPage } from './my-sell-requests.page';

const routes: Routes = [
  {
    path: '',
    component: MySellRequestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MySellRequestsPageRoutingModule {}
