import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MySellRequestsPageRoutingModule } from './my-sell-requests-routing.module';

import { MySellRequestsPage } from './my-sell-requests.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MySellRequestsPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [MySellRequestsPage]
})
export class MySellRequestsPageModule {}
