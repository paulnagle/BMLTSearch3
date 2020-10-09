import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VirtTabsPageRoutingModule } from './virt-tabs-routing.module';

import { VirtTabsPage } from './virt-tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VirtTabsPageRoutingModule
  ],
  declarations: [VirtTabsPage]
})
export class VirtTabsPageModule {}
