import { Component, OnInit, Input, AfterContentInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-meeting-card',
  templateUrl: './meeting-card.component.html',
  styleUrls: ['./meeting-card.component.scss'],
})
export class MeetingCardComponent implements OnInit, AfterContentInit {

  @Input() data: any;
  @Input() MeetingType: any;

  meeting: any;
  meetingType: any;

  constructor(private translate: TranslateService) { }

  ngOnInit() {}

  ngAfterContentInit() {
    this.meeting = this.data;
    this.meetingType = this.MeetingType;
    this.setMeetingEnd();
  }
  public openMapsLink(destLatitude: string, destLongitude: string) {
    const browser = Browser.open({url: 'https://www.google.com/maps/search/?api=1&query=' + destLatitude + ',' + destLongitude});
  }

  public openLink(url: any) {
    const browser = Browser.open({url: url});
  }

  public dialNum(url: string) {
    const telUrl = 'tel:' + url;
    const browser = Browser.open({url: telUrl});
  }

  isHybrid(meeting: { formats: string; }) {
    if (meeting.formats.match(/HY/i)) {
      return 'HYBRID';
    } else {
      return 'NOT-HYBRID';
    }
  }

  isTempClosed(meeting: { formats: string; }) {
    if (meeting.formats.match(/TC/i) && meeting.formats.match(/VM/i)) {
      return 'TEMPREPLACE';
    } else
    if ( meeting.formats.match(/TC/i) ) {
      return 'TEMPCLOSED';
    } else {
      return 'NOT-TEMPCLOSED';
    }
  }
  
  getMeetingType(meeting: { formats: string | string[]; }) {
    if ( meeting.formats === "" ) {
      return "INPERSON";
    } else if ( !meeting.formats.includes("VM") && !meeting.formats.includes("TC") && !meeting.formats.includes("HY") ) {
      return "INPERSON";
    } else if ( meeting.formats.includes("VM") && !meeting.formats.includes("TC") && !meeting.formats.includes("HY") ) {
      return "VIRTUAL";
    } else if ( meeting.formats.includes("VM") && meeting.formats.includes("TC") && !meeting.formats.includes("HY") ) {
      return 'TEMPREPLACE';
    } else if ( !meeting.formats.includes("VM") && !meeting.formats.includes("TC") && meeting.formats.includes("HY") ) {
      return "HYBRID";
    } else if ( meeting.formats.includes("VM") && !meeting.formats.includes("TC") && meeting.formats.includes("HY") ) {
      return "HYBRID";
    } else if ( !meeting.formats.includes("VM") && meeting.formats.includes("TC") && !meeting.formats.includes("HY")) {
      return "TEMPCLOSED"
    }
    return ""
  }

  setMeetingEnd() {
    var duration = this.meeting.duration_time.split(":");
    this.meeting.end_time_formatted = this.meeting.start_time_moment.clone().add(duration[0], 'hours').add(duration[1], 'minutes').format("h:mm a");
  }

}
