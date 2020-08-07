import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage {

  sourceCodeLink = 'https://github.com/bmlt-enabled/BMLTSearch';
  sourceBugs = 'https://github.com/bmlt-enabled/BMLTSearch/issues';
  bmltLink = 'https://bmlt.app/';
  fbGroupLink = 'https://www.facebook.com/groups/149214049107349/';

  constructor() {

  }
  public openLink(url) {
    window.open(url, '_system');
  }

}
