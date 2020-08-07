import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocationSearchPageRoutingModule } from './location-search-routing.module';

import { LocationSearchPage } from './location-search.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    LocationSearchPageRoutingModule
  ],
  declarations: [LocationSearchPage]
})
export class LocationSearchPageModule {}
