import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VirtTabsPageRoutingModule } from './virt-tabs-routing.module';
import { VirtTabsPage } from './virt-tabs.page';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    VirtTabsPageRoutingModule
  ],
  declarations: [VirtTabsPage],
  providers: []
})
export class VirtTabsPageModule {}
