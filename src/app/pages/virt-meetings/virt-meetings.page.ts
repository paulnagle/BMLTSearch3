import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { LoadingService } from '../../providers/loading.service';
import { ServiceGroupsProvider } from '../../providers/service-groups.service';
import { MeetingListProvider } from '../../providers/meeting-list.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { firstBy } from 'thenby';

@Component({
  selector: 'app-virt-meetings',
  templateUrl: './virt-meetings.page.html',
  styleUrls: ['./virt-meetings.page.scss'],
})
export class VirtMeetingsPage  {

  serviceGroups: any;
  serviceGroupHierarchy: any = [];
  shownDay = null;
  shownGroupL1 = null;
  shownGroupL2 = null;
  shownGroupL3 = null;
  shownGroupL4 = null;
  HTMLGrouping = 'areas';
  loader = null;
  meetingListArea: any = [];
  areaName: any = '';
  isLoaded = false;

  virtualNaLink = 'https://virtual-na.org/';

  constructor(
    private meetingListProvider: MeetingListProvider,
    private serviceGroupsProvider: ServiceGroupsProvider,
    private loaderCtrl: LoadingService,
    private translate: TranslateService,
    private storage: Storage,
    private iab: InAppBrowser) {

    this.translate.get('FINDING_MTGS').subscribe(value => { this.presentLoader(value); });

    this.serviceGroupsProvider.getAllVirtServiceGroups().then((serviceGroupData) => {
      this.serviceGroups = serviceGroupData;
      this.serviceGroups.sort(firstBy('parent_id').thenBy('name').thenBy('id'));
      this.serviceGroupHierarchy = this.getServiceHierarchy(this.serviceGroups, 0);
      this.showServiceStructure();
      this.dismissLoader();
    });
  }


  getServiceHierarchy(flatServiceGroups, parent) {
    const serviceGroupHierarchy = [];
    for (const i in flatServiceGroups) {
      if (flatServiceGroups[i].parent_id == parent) {
        const childServiceGroup = this.getServiceHierarchy(flatServiceGroups, flatServiceGroups[i].id);
        if (childServiceGroup.length) {
          flatServiceGroups[i].childServiceGroup = childServiceGroup;
        }
        serviceGroupHierarchy.push(flatServiceGroups[i]);
      }
    }
    return serviceGroupHierarchy;
  }

  toggleDay(day: any) {
    if (this.isDayShown(day)) {
      this.shownDay = null;
    } else {
      this.shownDay = day;
    }
  }

  toggleL1Group(L1group) {
    if (this.isL1GroupShown(L1group)) {
      this.shownGroupL1 = null;
    } else {
      this.shownGroupL1 = L1group;
      this.shownGroupL2 = null;
      this.shownGroupL3 = null;
      this.shownGroupL4 = null;
    }
  }

  toggleL2Group(L2group) {
    if (this.isL2GroupShown(L2group)) {
      this.shownGroupL2 = null;
    } else {
      this.shownGroupL2 = L2group;
      this.shownGroupL3 = null;
      this.shownGroupL4 = null;
    }
  }

  toggleL3Group(L3group) {
    if (this.isL3GroupShown(L3group)) {
      this.shownGroupL3 = null;
    } else {
      this.shownGroupL3 = L3group;
      this.shownGroupL4 = null;
    }
  }

  toggleL4Group(L4group) {
    if (this.isL4GroupShown(L4group)) {
      this.shownGroupL4 = null;
    } else {
      this.shownGroupL4 = L4group;
    }
  }

  isDayShown(day) { return this.shownDay === day; }
  isL1GroupShown(L1group) { return this.shownGroupL1 === L1group; }
  isL2GroupShown(L2group) { return this.shownGroupL2 === L2group; }
  isL3GroupShown(L3group) { return this.shownGroupL3 === L3group; }
  isL4GroupShown(L4group) { return this.shownGroupL4 === L4group; }

  getMeetingsByVirtArea(areaID, areaName) {
    this.translate.get('FINDING_MTGS').subscribe(value => { this.presentLoader(value); });
    this.HTMLGrouping = 'meetings';
    this.areaName = areaName;
    this.meetingListProvider.getMeetingsByVirtArea(areaID).then((data) => {

      if (JSON.stringify(data) === '{}') {  // empty result set!
        this.meetingListArea = JSON.parse('[]');
      } else {
        this.meetingListArea = data;
        this.isLoaded = true;
      }
      this.dismissLoader();
    });
  }


  presentLoader(loaderText: any) {
    if (!this.loader) {
      this.loader = this.loaderCtrl.present(loaderText);
    }
  }


  dismissLoader() {
    if (this.loader) {
      this.loader = this.loaderCtrl.dismiss();
      this.loader = null;
    }
  }


  showServiceStructure() {

    this.HTMLGrouping = 'areas';
    this.areaName = '';
    this.shownDay = null;
  }

  public openLink(url) {
    const browser = this.iab.create(url, '_system');
  }

}
