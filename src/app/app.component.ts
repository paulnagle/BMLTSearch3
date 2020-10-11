import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

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
      icon: 'globe-outline'
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
    private storage: Storage
  ) {
    this.initializeApp();
    this.translate.setDefaultLang('en');
    storage.get('language').then((value) => {
      if (value) {
        this.translate.use(value);
      } else {
        this.translate.use('en');
        storage.set('language', 'en');
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {

  }
}
