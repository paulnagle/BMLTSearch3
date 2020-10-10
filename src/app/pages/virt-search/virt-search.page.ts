import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-virt-search',
  templateUrl: './virt-search.page.html',
  styleUrls: ['./virt-search.page.scss'],
})
export class VirtSearchPage implements OnInit {

  radius = 10;
  language = 'english';

  constructor(    private translate: TranslateService) { }

  ngOnInit() {
  }
  public getNextMeetings() {

  }

  public selectLanguage() {

  }
}
