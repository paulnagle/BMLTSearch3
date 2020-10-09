import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VirtSearchPageRoutingModule } from './virt-search-routing.module';

import { VirtSearchPage } from './virt-search.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    VirtSearchPageRoutingModule
  ],
  declarations: [VirtSearchPage]
})
export class VirtSearchPageModule {}
