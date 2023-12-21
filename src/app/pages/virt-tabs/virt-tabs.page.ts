import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-virt-tabs',
  templateUrl: './virt-tabs.page.html',
  styleUrls: ['./virt-tabs.page.scss'],
})
export class VirtTabsPage implements OnInit {

  constructor(private translate: TranslateService) { }

  ngOnInit() {
  }

  public visit() {
    Browser.open({ url: 'https://virtual-na.org/'});
  }
}
