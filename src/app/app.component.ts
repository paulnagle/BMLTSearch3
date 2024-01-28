import { Component, NgZone } from '@angular/core';

import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from './services/storage.service'
import { SplashScreen } from '@capacitor/splash-screen';
import { App, URLOpenListenerEvent } from '@capacitor/app';
import { Router } from '@angular/router';

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
    private storage: StorageService,
    private router: Router,
    private zone: NgZone
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

      App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
          this.zone.run(() => {
              // Example url: https://beerswift.app/tabs/tab2
              // slug = /tabs/tab2
              const slug = event.url.split(".app").pop();
              if (slug) {
                  this.router.navigateByUrl(slug);
              }
              // If no match, do nothing - let regular routing
              // logic take over
          });
      });
  }

}
