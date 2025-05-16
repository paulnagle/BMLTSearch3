import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { IonAccordionGroup } from '@ionic/angular';
import { firstBy } from 'thenby';
import { Storage } from '@ionic/storage';
import { VirtFormatsService } from '../../services/virt-formats.service';
import { TomatoFormatsService } from '../../services/tomato-formats.service';
import { LoadingService } from 'src/app/services/loading.service';
import { format, setDay, setHours, setMinutes, getHours, addWeeks, isAfter, isSameDay } from 'date-fns';
import { toZonedTime, formatInTimeZone } from 'date-fns-tz';
import { RangeCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.scss'],
})
export class MeetingListComponent implements OnInit, OnChanges {

  @ViewChild('accordionGroup', { static: true }) accordionGroup!: IonAccordionGroup;

  @Input() data: any;
  @Input() meetingType: any;
  @Input() expandAll: any;

  meetingList: any = [];
  savedList: any = [];
  meetingListGroupedByDay: any;
  meetingsListGrouping = 'weekday_tinyint';
  localMeetingType: any;
  localExpandAll: any;
  dayCount = [0, 0, 0, 0, 0, 0, 0];
  formats: any;
  formatLanguage = 'en';
  language = 'english';
  selectedDay = 'WEEKDAYS';
  loader!: Promise<void> | Promise<boolean> | null;

  days = ['WEEKDAYS', 'SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  hourRangeValues: any = {
    upper: 23,
    lower: 0
  };

  displayUpper = '00:00 (12:00 am)';
  displayLower = '23:59 (11:59 pm)';

  constructor(
    private storage: Storage,
    private virtFormatsProvider: VirtFormatsService,
    private tomatoFormatsService: TomatoFormatsService,
    private loaderCtrl: LoadingService
  ) { }


  ngOnChanges() {
    this.ngOnInit();
  }


  ngOnInit() {
    this.storage.get('language').then((value) => {
      if (value) {
        this.formatLanguage = value;
      }
    });

    this.meetingList = this.data;
    this.localMeetingType = this.meetingType;
    this.localExpandAll = this.expandAll;

    if (this.localExpandAll === "false") {
      this.accordionGroup.value = undefined;
      this.accordionGroup.multiple = undefined;
    } else {
      this.accordionGroup.value = ['1', '2', '3', '4', '5', '6', '7'];
      this.accordionGroup.multiple = true;
    }

    if (this.localMeetingType === 'virt') {
      // Get the formats
      this.virtFormatsProvider.getAllVirtFormats().then((serviceGroupData) => {
        this.formats = serviceGroupData;
        this.formatMeetingList();
      });
    } else {
      this.formatMeetingList();
    }

  }


  formatMeetingList() {
    for (let i = 0; i < 7; i++) {
      this.dayCount[i] = this.meetingList.filter((list: { weekday_tinyint: string; }) => parseInt(list.weekday_tinyint, 10) === i + 1).length;
    }
    this.meetingListGroupedByDay = this.meetingList.concat();
    this.explodeFormats();
    this.setRawStartTime();
    this.meetingListGroupedByDay.sort((a: { weekday_tinyint: string; }, b: { weekday_tinyint: any; }) => a.weekday_tinyint.localeCompare(b.weekday_tinyint));
    this.savedList = this.meetingListGroupedByDay;
    this.meetingListGroupedByDay = this.groupMeetingList(this.meetingListGroupedByDay, this.meetingsListGrouping);
    for (let i of this.meetingListGroupedByDay) {
      i.sort(firstBy('weekday_tinyint').thenBy('start_time_raw')
      );
    }
  }


  explodeFormats() {
    if (this.localMeetingType === 'virt') {

      for (let i of this.meetingListGroupedByDay) {
        const splitFormats = i.formats.split(',');
        i.formats_exploded = '';
        for (let j of splitFormats) {
          const longFormat = this.formats.filter((data: { key_string: any; }) => data.key_string === j);
          if (longFormat[0]) {
            i.formats_exploded += longFormat[0].name_string + '. ';
          } else {
            i.formats_exploded += j + '. ';
          }
        }
      }
    } else {
      if (this.localMeetingType === 'regular') {
        this.tomatoFormatsService.setExplodedFormatsOnMeetingList(this.meetingListGroupedByDay, this.formatLanguage);
      }
    }
  }


  private groupMeetingList(meetingList: any[], groupingOption: string) {
    // A function to convert a flat json list to an javascript array
    const groupJSONList = function (inputArray: any[], key: string) {
      return inputArray.reduce(function (ouputArray: { [x: string]: any[]; }, currentValue: { [x: string]: string | number; }) {
        (ouputArray[currentValue[key]] = ouputArray[currentValue[key]] || []).push(currentValue);
        return ouputArray;
      }, {});
    };
    // Convert the flat json to an array grouped by and indexed by the meetingsListGroupingOne field,
    const groupedByGroupingOne = groupJSONList(meetingList, groupingOption);

    // Make the array a proper javascript array, index by number
    const groupedByGroupingOneAsArray = Object.keys(groupedByGroupingOne).map(function (key) {
      return groupedByGroupingOne[key];
    });

    meetingList = groupedByGroupingOneAsArray;
    return meetingList;
  }


  isExpandAll() {
    if (this.localExpandAll == "true") {
      return true;
    } else {
      return false;
    }
  }


  public isToday(dayOfWeek: string) {
    const d = new Date();
    const n = d.getDay();
    if (parseInt(dayOfWeek, 10) === (n + 1)) {
      return true;
    } else {
      return false;
    }
  }


  setRawStartTime() {
    for (let meeting of this.meetingListGroupedByDay) {
      if (this.localMeetingType === 'virt') {
        const startTimeRaw = this.getAdjustedDateTime(
          parseInt(meeting.weekday_tinyint, 10) === 1 ? 7 : parseInt(meeting.weekday_tinyint, 10) - 1,
          meeting.start_time,
          meeting.time_zone
        );

        meeting.start_time_moment = startTimeRaw;
        meeting.start_time_raw = formatInTimeZone(
          startTimeRaw,
          meeting.time_zone,
          'HH:mm (h:mm a)'
        );
        meeting.start_time_raw += ` (${meeting.time_zone})`;
      } else {
        const [hours, minutes] = meeting.start_time.split(':').map(Number);
        const now = new Date();
        const meetingDate = setDay(
          setMinutes(setHours(now, hours), minutes),
          parseInt(meeting.weekday_tinyint, 10) === 1 ? 7 : parseInt(meeting.weekday_tinyint, 10) - 1
        );

        // If the meeting time has passed today, schedule for next week
        if (isAfter(now, meetingDate) || isSameDay(now, meetingDate)) {
          meetingDate.setDate(meetingDate.getDate() + 7);
        }

        meeting.start_time_moment = meetingDate;
        meeting.start_time_raw = format(meetingDate, 'HH:mm (h:mm a)');
      }
    }
  }


  getAdjustedDateTime(meetingDay: number, meetingTime: string, meetingTimeZone: string) {
    const [hours, minutes] = meetingTime.split(':').map(Number);
    const now = new Date();
    const meetingDate = setDay(
      setMinutes(setHours(now, hours), minutes),
      meetingDay
    );

    // Convert to the meeting's timezone
    const zonedDate = toZonedTime(meetingDate, meetingTimeZone || 'UTC');

    // If the meeting time has passed today, schedule for next week
    if (isAfter(now, zonedDate) || isSameDay(now, zonedDate)) {
      return addWeeks(zonedDate, 1);
    }

    return zonedDate;
  }


  public setDay() {
    this.filterMeetings();
  }


  public setHourRangeValues(ev: Event) {
    this.hourRangeValues = (ev as RangeCustomEvent).detail.value;

    const upperDate = setMinutes(setHours(new Date(), this.hourRangeValues.upper), 59);
    this.displayUpper = format(upperDate, 'HH:mm (h:mm a)');

    const lowerDate = setMinutes(setHours(new Date(), this.hourRangeValues.lower), 0);
    this.displayLower = format(lowerDate, 'HH:mm (h:mm a)');

    this.filterMeetings();
  }


  public filterMeetings() {
    let tempMeetingListGroupedByDay = [];
    tempMeetingListGroupedByDay = this.savedList;

    // Filter by Day
    if (this.days.indexOf(this.selectedDay) > 0) {
      tempMeetingListGroupedByDay = tempMeetingListGroupedByDay.filter(
        (meeting: { weekday_tinyint: string; }) => parseInt(meeting.weekday_tinyint, 10) === this.days.indexOf(this.selectedDay)
      );
    }

    // Filter by hour
    const rangeLower = this.hourRangeValues.lower;
    const rangeUpper = this.hourRangeValues.upper;

    tempMeetingListGroupedByDay = tempMeetingListGroupedByDay.filter(
      (meeting: { start_time_moment: Date }) => {
        const hour = getHours(meeting.start_time_moment);
        return hour >= rangeLower && hour <= rangeUpper;
      }
    );

    // Count the newly filtered list by day
    for (let i = 0; i < 7; i++) {
      this.dayCount[i] = tempMeetingListGroupedByDay.filter(
        (list: { weekday_tinyint: string; }) => parseInt(list.weekday_tinyint, 10) === i + 1
      ).length;
    }

    // Arrange the list into an array by day
    tempMeetingListGroupedByDay = this.groupMeetingList(tempMeetingListGroupedByDay, this.meetingsListGrouping);

    // Sort each day in the array
    for (let i of tempMeetingListGroupedByDay) {
      i.sort(firstBy('weekday_tinyint').thenBy('start_time_moment'));
    }

    // Overwrite the display list with the newly filtered list
    this.meetingListGroupedByDay = tempMeetingListGroupedByDay;
  }
}
