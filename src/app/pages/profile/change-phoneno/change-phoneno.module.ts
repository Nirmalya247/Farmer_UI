import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangePhonenoPageRoutingModule } from './change-phoneno-routing.module';

import { ChangePhonenoPage } from './change-phoneno.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ChangePhonenoPageRoutingModule,
        TranslateModule.forChild()
    ],
    declarations: [ChangePhonenoPage]
})
export class ChangePhonenoPageModule { }
