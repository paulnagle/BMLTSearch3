import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VirtMeetingsPageRoutingModule } from './virt-meetings-routing.module';
import { VirtMeetingsPage } from './virt-meetings.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ComponentModule } from '../../components/component/component.module';
import { MeetingListProvider } from 'src/app/providers/meeting-list.service';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { TranslateModule } from '@ngx-translate/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { ServiceGroupsProvider } from 'src/app/providers/service-groups.service';
import { StorageService } from 'src/app/providers/storage.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    VirtMeetingsPageRoutingModule,
    PipesModule,
    ComponentModule
  ],
  declarations: [VirtMeetingsPage],
  providers: [
    InAppBrowser,
    MeetingListProvider,
    HTTP,
    ServiceGroupsProvider,
    StorageService
  ]
})
export class VirtMeetingsPageModule {}
