import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DoIHaveTheBmltPageRoutingModule } from './do-i-have-the-bmlt-routing.module';
import { DoIHaveTheBmltPage } from './do-i-have-the-bmlt.page';

import { TranslateModule } from '@ngx-translate/core';
import { MeetingListService } from 'src/app/services/meeting-list.service';
import { ServiceGroupsService } from 'src/app/services/service-groups.service';
import { StorageService } from 'src/app/services/storage.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    DoIHaveTheBmltPageRoutingModule
  ],
  declarations: [DoIHaveTheBmltPage],
  providers: [MeetingListService, ServiceGroupsService, StorageService]
})
export class DoIHaveTheBmltPageModule {}
