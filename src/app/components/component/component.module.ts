import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingCardComponent } from '../meeting-card/meeting-card.component';
import { MeetingListComponent } from '../meeting-list/meeting-list.component';
import { VirtMeetingCardComponent } from '../virt-meeting-card/virt-meeting-card.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [MeetingCardComponent, MeetingListComponent, VirtMeetingCardComponent],
  imports: [
    CommonModule,
    PipesModule,
    IonicModule,
    TranslateModule
  ],
  exports: [MeetingCardComponent, MeetingListComponent, VirtMeetingCardComponent],
  entryComponents: [MeetingCardComponent, MeetingListComponent, VirtMeetingCardComponent]
})
export class ComponentModule { }
