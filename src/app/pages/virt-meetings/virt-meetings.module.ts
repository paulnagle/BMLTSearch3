import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VirtMeetingsPageRoutingModule } from './virt-meetings-routing.module';
import { VirtMeetingsPage } from './virt-meetings.page';

import { MeetingListService } from 'src/app/services/meeting-list.service';
import { TranslateModule } from '@ngx-translate/core';
import { ServiceGroupsService } from 'src/app/services/service-groups.service';
import { StorageService } from 'src/app/services/storage.service';

import { ComponentModule } from '../../components/component/component.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    VirtMeetingsPageRoutingModule,
    ComponentModule
  ],
  declarations: [VirtMeetingsPage],
  providers: [
    MeetingListService,
    ServiceGroupsService,
    StorageService
  ]
})
export class VirtMeetingsPageModule {}
