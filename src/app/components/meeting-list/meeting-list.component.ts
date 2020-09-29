import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { firstBy } from 'thenby';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.scss'],
})
export class MeetingListComponent implements OnInit, OnChanges {

  @Input() data;
  meetingList;
  meetingListGroupedByDay;
  shownDay = null;
  meetingsListGrouping = 'weekday_tinyint';
  timeDisplay;

  dayCount = [0, 0, 0, 0, 0, 0, 0];

  constructor(private storage: Storage, private translate: TranslateService) {
    this.meetingList = [];
  }

  ngOnChanges() {
    this.formatMeetingList();
  }

  ngOnInit() {
    this.storage.ready().then(() => {
      this.storage.get('timeDisplay')
        .then(timeDisplay => {
          if (timeDisplay) {
            this.timeDisplay = timeDisplay;
          } else {
            this.timeDisplay = '24hr';
          }
        });
      });
    this.formatMeetingList();

  }

  formatMeetingList() {
    this.meetingList = this.data;
    for (let i = 0; i < 7; i++) {
      this.dayCount[i] = this.meetingList.filter(list => list.weekday_tinyint == i + 1).length;
    }

    this.meetingListGroupedByDay = this.meetingList.concat();
    this.meetingListGroupedByDay.filter(i => i.start_time_set = this.convertTo12Hr(i.start_time));

    this.meetingListGroupedByDay.sort((a, b) => a.weekday_tinyint.localeCompare(b.weekday_tinyint));
    this.meetingListGroupedByDay = this.groupMeetingList(this.meetingListGroupedByDay, this.meetingsListGrouping);
    for (let i = 0; i < this.meetingListGroupedByDay.length; i++) {
      this.meetingListGroupedByDay[i].sort(
        firstBy('weekday_tinyint')
          .thenBy('start_time')
      );
    }
  }

  groupMeetingList(meetingList, groupingOption) {
    // A function to convert a flat json list to an javascript array
    const groupJSONList = function(inputArray, key) {
      return inputArray.reduce(function(ouputArray, currentValue) {
        (ouputArray[currentValue[key]] = ouputArray[currentValue[key]] || []).push(currentValue);
        return ouputArray;
      }, {});
    };
    // Convert the flat json to an array grouped by and indexed by the meetingsListGroupingOne field,
    const groupedByGroupingOne = groupJSONList(meetingList, groupingOption);

    // Make the array a proper javascript array, index by number
    const groupedByGroupingOneAsArray = Object.keys(groupedByGroupingOne).map(function(key) {
      return groupedByGroupingOne[key];
    });

    meetingList = groupedByGroupingOneAsArray;
    return meetingList;
  }


  toggleDay(dayGrouping) {
    if (this.isDayShown(dayGrouping)) {
      this.shownDay = null;
    } else {
      this.shownDay = dayGrouping;
    }
  }


  isDayShown(dayGrouping) {
    return this.shownDay === dayGrouping;
  }


  public convertTo12Hr(timeString) {
    if (this.timeDisplay === '12hr') {
      const H = +timeString.substr(0, 2);
      const h = H % 12 || 12;
      const ampm = (H < 12 || H === 24) ? ' AM' : ' PM';
      timeString = h + timeString.substr(2, 3) + ampm;
      return timeString;
    } else {
      return timeString.slice(0, -3);
    }
  }


  public isToday(dayOfWeek) {
    const d = new Date();
    const n = d.getDay();
    if (dayOfWeek == (n + 1)) {
      return true;
    } else {
      return false;
    }
  }

}
