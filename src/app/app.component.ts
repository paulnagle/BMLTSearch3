import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from './providers/storage.service'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

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
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService,
    private storage: StorageService
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      if (this.platform.is('android')) {
        this.statusBar.backgroundColorByHexString("#d5d5d5");
      }
      this.splashScreen.hide();
    });

    this.translate.setDefaultLang('en');

    const langValue = await this.storage.get('language');
    if (langValue) {
      this.translate.use(langValue);
    } else {
      this.translate.use('en');
      this.storage.set('language', 'en');
    }
  }

  ngOnInit() {
  }
}
