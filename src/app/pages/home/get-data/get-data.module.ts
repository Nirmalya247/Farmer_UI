import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GetDataPageRoutingModule } from './get-data-routing.module';

import { GetDataPage } from './get-data.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GetDataPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [GetDataPage]
})
export class GetDataPageModule {}
