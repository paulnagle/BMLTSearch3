import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListfullPageRoutingModule } from './listfull-routing.module';

import { ListfullPage } from './listfull.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ListfullPageRoutingModule
  ],
  declarations: [ListfullPage]
})
export class ListfullPageModule {}
