import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageShopPageRoutingModule } from './manage-shop-routing.module';

import { ManageShopPage } from './manage-shop.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageShopPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [ManageShopPage]
})
export class ManageShopPageModule {}
