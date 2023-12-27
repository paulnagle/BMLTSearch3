import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from './services/storage.service'
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    {
      title: 'HOME',
      url: 'home',
      icon: 'home'
    },
    {
      title: 'SETTINGS',
      url: 'settings',
      icon: 'settings'
    },
    {
      title: 'MAP_SEARCH',
      url: 'map-search',
      icon: 'map'
    },
    {
      title: 'LOCATIONSEARCH',
      url: 'location-search',
      icon: 'search'
    },
    {
      title: 'LISTFULL',
      url: 'listfull',
      icon: 'list'
    },
    {
      title: 'VIRTUAL_MEETINGS',
      url: 'virt-tabs',
      icon: 'globe'
    },
    {
      title: 'DOIHAVETHEBMLT',
      url: 'do-i-have-the-bmlt',
      icon: 'help'
    },
    {
      title: 'CONTACT',
      url: 'contact',
      icon: 'person'
    }
  ];

  constructor(
    private platform: Platform,
    private translate: TranslateService,
    private storage: StorageService
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    this.translate.setDefaultLang('en');

    await SplashScreen.hide();

    const langValue = await this.storage.get('language');
    if (langValue) {
      this.translate.use(langValue);
    } else {
      this.translate.use('en');
      this.storage.set('language', 'en');
    }
  }
}
