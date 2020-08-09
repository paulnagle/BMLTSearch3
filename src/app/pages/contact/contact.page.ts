import { Component } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage {

  sourceCodeLink = 'https://github.com/bmlt-enabled/BMLTSearch3';
  sourceBugs = 'https://github.com/bmlt-enabled/BMLTSearch3/issues';
  bmltLink = 'https://bmlt.app/';
  fbGroupLink = 'https://www.facebook.com/groups/149214049107349/';

  constructor(private iab: InAppBrowser) {

  }
  public openLink(url) {
    const browser = this.iab.create(url, '_system');
  }

}
