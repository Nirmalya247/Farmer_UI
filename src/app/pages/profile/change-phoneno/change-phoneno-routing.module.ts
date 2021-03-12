import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangePhonenoPage } from './change-phoneno.page';

const routes: Routes = [
  {
    path: '',
    component: ChangePhonenoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangePhonenoPageRoutingModule {}
