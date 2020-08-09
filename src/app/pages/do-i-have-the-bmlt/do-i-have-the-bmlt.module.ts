import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { DoIHaveTheBmltPageRoutingModule } from './do-i-have-the-bmlt-routing.module';
import { DoIHaveTheBmltPage } from './do-i-have-the-bmlt.page';
import { TranslateModule } from '@ngx-translate/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { MeetingListProvider } from 'src/app/providers/meeting-list.service';
import { ServiceGroupsProvider } from 'src/app/providers/service-groups.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    DoIHaveTheBmltPageRoutingModule
  ],
  declarations: [DoIHaveTheBmltPage],
  providers: [InAppBrowser, MeetingListProvider, ServiceGroupsProvider, Geolocation]
})
export class DoIHaveTheBmltPageModule {}
