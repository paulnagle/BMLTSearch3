import { Component, OnInit, Input, AfterContentInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Capacitor } from '@capacitor/core';
import { Browser } from '@capacitor/browser';
import { Share } from '@capacitor/share';
import { addHours, addMinutes, format } from 'date-fns';

@Component({
    selector: 'app-meeting-card',
    templateUrl: './meeting-card.component.html',
    styleUrls: ['./meeting-card.component.scss'],
    standalone: false
})
export class MeetingCardComponent implements OnInit, AfterContentInit {

  @Input() data: any;
  @Input() MeetingType: any;

  meeting: any;
  meetingType: any;

  public canShare: boolean = false;

  constructor(private translate: TranslateService) { }

  ngOnInit() {}

  ngAfterContentInit() {
    this.meeting = this.data;
    this.meetingType = this.MeetingType;
    this.setMeetingEnd();
    Share.canShare().then(result => {
      if (result.value) {
        this.canShare = true
      } else {
        this.canShare = false
      }
   });
  }


  shareMeeting(meeting: any) {

    Share.canShare().then(result => {
      if (result.value) {

        let daysOfWeek: any = ['']

        this.translate.get('SUNDAY').subscribe(value => { daysOfWeek[1] = value });
        this.translate.get('MONDAY').subscribe(value => { daysOfWeek[2] = value });
        this.translate.get('TUESDAY').subscribe(value => { daysOfWeek[3] = value });
        this.translate.get('WEDNESDAY').subscribe(value => { daysOfWeek[4] = value });
        this.translate.get('THURSDAY').subscribe(value => { daysOfWeek[5] = value });
        this.translate.get('FRIDAY').subscribe(value => { daysOfWeek[6] = value });
        this.translate.get('SATURDAY').subscribe(value => { daysOfWeek[7] = value });

        let shareText = meeting.meeting_name + ' : '
          + daysOfWeek[meeting.weekday_tinyint] + ' '
          + meeting.start_time_raw + ' - ' + meeting.end_time_formatted + ' : '

        if (meeting.location_text) { shareText += + meeting.location_text }
        if (meeting.location_street) { shareText += ' , ' + meeting.location_street }
        if (meeting.location_city_subsection) { shareText += ' , ' + meeting.location_city_subsection }
        if (meeting.location_neighborhood) { shareText += ' , ' + meeting.location_neighborhood }
        if (meeting.location_municipality) { shareText += ' , ' + meeting.location_municipality }
        if (meeting.location_sub_province) { shareText += ' , ' + meeting.location_sub_province }
        if (meeting.location_postal_code_1) { shareText += ' , ' + meeting.location_postal_code_1 }
        if (meeting.location_info) { shareText += ' , ' + meeting.location_info }
        if (meeting.comments) { shareText += ' , ' + meeting.comments }
        if (meeting.train_lines) { shareText += ' , ' + meeting.train_lines }
        if (meeting.bus_lines) { shareText += ' , ' + meeting.bus_lines }
        if (meeting.phone_meeting_number) { shareText += ' , ' + meeting.phone_meeting_number }

        let shareLink = ''
        if (meeting.virtual_meeting_link) {
          shareLink = meeting.virtual_meeting_link
        } else {
          shareLink = 'https://www.google.com/maps/search/?api=1&query=' + meeting.latitude + ',' + meeting.longitude
        }

        shareText += '    url: ' + shareLink

        Share.share({
          title: meeting.meeting_name,
          text: shareText,
          url: shareLink,
          dialogTitle: 'Share this meeting',
        });
      } else {
        console.log("Cannot share")
      }
    });
  }

  public openMapsLink(destLatitude: string, destLongitude: string) {
    const platform = Capacitor.getPlatform();

    if (platform === 'ios') {
      window.open(`maps://?daddr=${destLatitude},${destLongitude}`, '_system');
    } else if (platform === 'android') {
      window.open(`geo:${destLatitude},${destLongitude}?q=${destLatitude},${destLongitude}`, '_system');
    } else {
      Browser.open({url: `https://www.google.com/maps/search/?api=1&query=${destLatitude},${destLongitude}`}).catch((error: any) => {
        console.log(error);
      });
    }
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
    const duration = this.meeting.duration_time.split(":");
    const endTime = addMinutes(
      addHours(this.meeting.start_time_moment, parseInt(duration[0], 10)),
      parseInt(duration[1], 10)
    );
    this.meeting.end_time_formatted = format(endTime, "h:mm a");
  }

}
