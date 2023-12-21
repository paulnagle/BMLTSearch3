import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LocationSearchPageRoutingModule } from './location-search-routing.module';
import { LocationSearchPage } from './location-search.page';

import { TranslateModule } from '@ngx-translate/core';

import { StorageService } from 'src/app/services/storage.service';
import { MeetingListService } from 'src/app/services/meeting-list.service';
import { GeocodeService } from 'src/app/services/geocode.service';

import { ComponentModule } from '../../components/component/component.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    LocationSearchPageRoutingModule,
    ComponentModule
  ],
  declarations: [
    LocationSearchPage
  ],
  providers: [
    MeetingListService,
    Geolocation,
    GeocodeService,
    StorageService
  ]
})
export class LocationSearchPageModule {}
