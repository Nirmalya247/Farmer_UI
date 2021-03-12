import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminSellRequestsPageRoutingModule } from './admin-sell-requests-routing.module';

import { AdminSellRequestsPage } from './admin-sell-requests.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminSellRequestsPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [AdminSellRequestsPage]
})
export class AdminSellRequestsPageModule {}
