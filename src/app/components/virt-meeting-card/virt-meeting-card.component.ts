import { Component, OnInit, Input, AfterContentInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-virt-meeting-card',
  templateUrl: './virt-meeting-card.component.html',
  styleUrls: ['./virt-meeting-card.component.scss'],
})
export class VirtMeetingCardComponent implements OnInit, AfterContentInit {

  @Input() data;
  meeting;

  constructor(
    private iab: InAppBrowser,
    private translate: TranslateService) { }

  ngOnInit() {}

  ngAfterContentInit() {
    this.meeting = this.data;
  }
  public openMapsLink(destLatitude, destLongitude) {
    const browser = this.iab.create('https://www.google.com/maps/search/?api=1&query=' + destLatitude + ',' + destLongitude, '_system');
  }

  public openLink(url) {
    const browser = this.iab.create(url, '_system');
  }

  public dialNum(url) {
    const telUrl = 'tel:' + url;
    const browser = this.iab.create(telUrl, '_system');
  }

  isHybrid(meeting) {
    if (meeting.formats.match(/HY/i)) {
      return 'HYBRID';
    } else {
      return 'NOT-HYBRID';
    }
  }

  isTempClosed(meeting) {
    if (meeting.formats.match(/TC/i)) {
      return 'TEMPCLOSED';
    } else {
      return 'NOT-TEMPCLOSED';
    }
  }

  public isToday(dayOfWeek) {
    const d = new Date();
    const n = d.getDay();
    if (dayOfWeek === (n + 1)) {
      return true;
    } else {
      return false;
    }
  }

}
