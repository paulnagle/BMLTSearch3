import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MapSearchPageRoutingModule } from './map-search-routing.module';
import { MapSearchPage } from './map-search.page';
import { TranslateModule } from '@ngx-translate/core';
import { Base64 } from '@ionic-native/base64/ngx';
import { ModalPage } from '../modal/modal.page';
import { Routes } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { MeetingListProvider } from 'src/app/providers/meeting-list.service';
import { ComponentModule } from '../../components/component/component.module';

const routes: Routes = [
  {
    path: '',
    component: MapSearchPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    MapSearchPageRoutingModule,
    ComponentModule
  ],
  declarations: [
    MapSearchPage,
    ModalPage
  ],
  entryComponents: [
    ModalPage
  ],
  providers: [
    Base64,
    InAppBrowser,
    MeetingListProvider
  ]
})
export class MapSearchPageModule {}
