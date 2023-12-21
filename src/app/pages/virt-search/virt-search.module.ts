import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VirtSearchPageRoutingModule } from './virt-search-routing.module';
import { VirtSearchPage } from './virt-search.page';

import { TranslateModule } from '@ngx-translate/core';
import { MeetingListService } from 'src/app/services/meeting-list.service';
import { StorageService } from 'src/app/services/storage.service';

import { ComponentModule } from '../../components/component/component.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    VirtSearchPageRoutingModule,
    ComponentModule
  ],
  declarations: [VirtSearchPage],
  providers: [
    MeetingListService,
    StorageService
  ]
})
export class VirtSearchPageModule {}
