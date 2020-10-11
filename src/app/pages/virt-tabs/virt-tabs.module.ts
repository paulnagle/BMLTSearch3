import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VirtTabsPageRoutingModule } from './virt-tabs-routing.module';
import { VirtTabsPage } from './virt-tabs.page';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VirtTabsPageRoutingModule
  ],
  declarations: [VirtTabsPage],
  providers: [InAppBrowser]
})
export class VirtTabsPageModule {}
