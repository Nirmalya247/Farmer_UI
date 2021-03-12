import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetDataPage } from './get-data.page';

const routes: Routes = [
  {
    path: '',
    component: GetDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GetDataPageRoutingModule {}
