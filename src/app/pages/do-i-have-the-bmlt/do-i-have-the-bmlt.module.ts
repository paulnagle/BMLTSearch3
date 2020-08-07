import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoIHaveTheBmltPageRoutingModule } from './do-i-have-the-bmlt-routing.module';

import { DoIHaveTheBmltPage } from './do-i-have-the-bmlt.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    DoIHaveTheBmltPageRoutingModule
  ],
  declarations: [DoIHaveTheBmltPage]
})
export class DoIHaveTheBmltPageModule {}
