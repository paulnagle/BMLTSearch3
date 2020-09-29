import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListfullPageRoutingModule } from './listfull-routing.module';
import { ListfullPage } from './listfull.page';
import { TranslateModule } from '@ngx-translate/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { MeetingListProvider } from 'src/app/providers/meeting-list.service';
import { ServiceGroupsProvider } from 'src/app/providers/service-groups.service';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ComponentModule } from '../../components/component/component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    PipesModule,
    ListfullPageRoutingModule,
    ComponentModule
  ],
  declarations: [
    ListfullPage
  ],
  providers: [
    InAppBrowser,
    MeetingListProvider,
    ServiceGroupsProvider
  ]
})
export class ListfullPageModule {}
