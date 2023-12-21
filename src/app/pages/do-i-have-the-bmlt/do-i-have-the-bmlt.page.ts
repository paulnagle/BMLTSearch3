import { Component } from '@angular/core';
import { MeetingListService } from '../../services/meeting-list.service';
import { ServiceGroupsService } from '../../services/service-groups.service';
import { StorageService } from '../../services/storage.service';
import { TranslateService } from '@ngx-translate/core';
import { LoadingService } from '../../services/loading.service';

import { Browser } from '@capacitor/browser';
import { Geolocation } from '@capacitor/geolocation';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-do-i-have-the-bmlt',
  templateUrl: './do-i-have-the-bmlt.page.html',
  styleUrls: ['./do-i-have-the-bmlt.page.scss'],
})
export class DoIHaveTheBmltPage  {

  currentAddress: any = '';
  addressLatitude: any = 0;
  addressLongitude: any = 0;
  nearestMeeting: any = [];
  serviceGroupNames: any = [];
  bmltEnabled = 'maybe';
  loader!: Promise<void> | Promise<boolean> | null;

  constructor(
    private MeetingLists: MeetingListService,
    private ServiceGroups: ServiceGroupsService,
    public loaderCtrl: LoadingService,
    private translate: TranslateService,
    private storage: StorageService) {

    this.ServiceGroups.getAllServiceGroups().then((response) => {
      this.serviceGroupNames = response.data;

      this.storage.get('savedAddressLat').then(value => {
        if (value) {
          this.addressLatitude = value;
          this.storage.get('savedAddressLng').then(value => {
            if (value) {
              this.addressLongitude = value;
              this.findNearestMeeting();
            } else {
              this.locatePhone();
            }
          });
        } else {
          this.locatePhone();
        }
      });
    });
  }

  getServiceNameFromID(id: any) {
    const obj = this.serviceGroupNames.find(function(obj: { id: any; }) { return obj.id === id; });
    return obj.name;
  }

  findNearestMeeting() {
    this.translate.get('LOCATING').subscribe(value => { this.presentLoader(value); });

    this.MeetingLists.getNearestMeeting(this.addressLatitude, this.addressLongitude).then(value => {
      this.nearestMeeting =  value.data;
      this.nearestMeeting = this.nearestMeeting.filter(
        (meeting: { service_body_bigint: any; }) => meeting.service_body_bigint = this.getServiceNameFromID(meeting.service_body_bigint)
      );

      this.dismissLoader();
      if (this.nearestMeeting[0].distance_in_miles < 100) {
        this.bmltEnabled = 'true';
      } else {
        this.bmltEnabled = 'false';
      } 
    });

  }

  presentLoader(loaderText: any) {
    if (!this.loader) {
      this.loader = this.loaderCtrl.present(loaderText);
    }
  }

  dismissLoader() {
    if (this.loader) {
      console.log('Dismissing loader..');
      this.loader = this.loaderCtrl.dismiss();
      this.loader = null;
    }
  }

  locatePhone() {
    this.translate.get('LOCATING').subscribe(
      value => { this.presentLoader(value); }
    );

    Geolocation.getCurrentPosition({ timeout: 10000 }).then((resp) => {
      this.addressLatitude = resp.coords.latitude;
      this.addressLongitude = resp.coords.longitude;
      this.storage.set('savedAddressLat', this.addressLatitude);
      this.storage.set('savedAddressLng', this.addressLongitude);
      this.findNearestMeeting();
    }).catch((error) => {
      this.currentAddress = 'Location not found';
      this.dismissLoader();
    });
  }

  public openLink(url: any) {
    Browser.open({url: url});

  }
}
