import { Component } from '@angular/core';
import { Browser } from '@capacitor/browser';


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

  constructor() {}
  
  public openLink(url: any) {
    Browser.open({ url: url });
  }

}
