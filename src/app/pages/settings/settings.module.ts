import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SettingsPageRoutingModule } from './settings-routing.module';
import { SettingsPage } from './settings.page';
import { TranslateModule } from '@ngx-translate/core';
import { StorageService } from 'src/app/providers/storage.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    TranslateModule,
    SettingsPageRoutingModule
  ],
  declarations: [SettingsPage],
  providers: [ StorageService]
})
export class SettingsPageModule {}
