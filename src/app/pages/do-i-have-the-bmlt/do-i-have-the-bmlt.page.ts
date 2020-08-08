import { Component } from '@angular/core';
import { MeetingListProvider } from '../../providers/meeting-list.service';
import { ServiceGroupsProvider } from '../../providers/service-groups.service';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { TranslateService } from '@ngx-translate/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { LoadingService } from '../../providers/loading.service';

@Component({
  selector: 'app-do-i-have-the-bmlt',
  templateUrl: './do-i-have-the-bmlt.page.html',
  styleUrls: ['./do-i-have-the-bmlt.page.scss'],
})
export class DoIHaveTheBmltPage  {

  currentAddress: any = '';
  addressLatitude: any = 0;
  addressLongitude: any = 0;
  nearestMeeting: any = '';
  serviceGroupNames: any;
  bmltEnabled = 'maybe';
  loader = null;

  constructor(
    private MeetingLists: MeetingListProvider,
    private ServiceGroups: ServiceGroupsProvider,
    public loaderCtrl: LoadingService,
    private translate: TranslateService,
    private storage: Storage,
    private geolocation: Geolocation,
    private iab: InAppBrowser) {

    this.ServiceGroups.getAllServiceGroups().subscribe((serviceGroupData) => {
      this.serviceGroupNames = serviceGroupData;
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

  getServiceNameFromID(id) {
    const obj = this.serviceGroupNames.find(function(obj) { return obj.id === id; });
    return obj.name;
  }

  findNearestMeeting() {
    this.translate.get('LOCATING').subscribe(value => { this.presentLoader(value); });

    this.MeetingLists.getNearestMeeting(this.addressLatitude, this.addressLongitude).subscribe((data) => {
      this.nearestMeeting = data;
      this.nearestMeeting = this.nearestMeeting.filter(
        meeting => meeting.service_body_bigint = this.getServiceNameFromID(meeting.service_body_bigint)
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

    this.geolocation.getCurrentPosition({ timeout: 10000 }).then((resp) => {
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


  public openLink(url) {
    const browser = this.iab.create(url, '_system');

  }


}
