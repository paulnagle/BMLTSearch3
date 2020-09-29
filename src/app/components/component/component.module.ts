import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeetingCardComponent } from '../meeting-card/meeting-card.component';
import { PipesModule } from 'src/app/pipes/pipes.module';

import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [MeetingCardComponent],
  imports: [
    CommonModule,
    PipesModule,
    IonicModule,
    TranslateModule
  ],
  exports: [MeetingCardComponent],
  entryComponents: [MeetingCardComponent]
})
export class ComponentModule { }
