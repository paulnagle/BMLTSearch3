import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '../../services/storage.service';
import { MeetingListService } from '../../services/meeting-list.service';
import { GeocodeService } from '../../services/geocode.service';
import { LoadingService } from '../../services/loading.service';
import { RangeCustomEvent } from '@ionic/angular';

import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-location-search',
  templateUrl: './location-search.page.html',
  styleUrls: ['./location-search.page.scss'],
})
export class LocationSearchPage  {

  addressMeetingList: any;
  meetingsListGrouping: string;

  shownGroup = null;
  loader!: Promise<void> | Promise<boolean> | null;
  isLoaded = false;
  currentAddress: any = '';
  addressLatitude: any = 0;
  addressLongitude: any = 0;
  radius!: any;
  radiusMeters = 10000;

  constructor(private MeetingListService: MeetingListService,
              private loaderCtrl: LoadingService,
              private storage: StorageService,
              private translate: TranslateService,
              private GeocodeService: GeocodeService) {
    this.meetingsListGrouping = 'weekday_tinyint';

    // this.storage.ready().then(() => {

      this.storage.get('searchRange')
        .then(searchValue => {
          if (searchValue) {
            this.radius = searchValue;
          } else {
            this.radius = 25;
          }
        });

      this.storage.get('savedAddressLat').then(value => {
        if (value) {
          this.addressLatitude = value;
          this.storage.get('savedAddressLng').then(value => {
            if (value) {
              this.addressLongitude = value;
              this.storage.get('savedAddress').then(value => {
                if (value) {
                  this.currentAddress = value;
                  this.locatePhone();
                } else {
                  this.locatePhone();
                }
              });
            } else {
              this.locatePhone();
            }
          });
        } else {
          this.locatePhone();
        }
      });
    // });

  }

  getAllMeetingsAfterLocate() {
    this.MeetingListService.getAddressMeetings(this.addressLatitude, this.addressLongitude, this.radius).then((response) => {
      this.addressMeetingList = response.data;
      this.isLoaded = true;
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

  locatePhone() {
    this.translate.get('LOCATING').subscribe(value => { this.presentLoader(value); });
    Geolocation.getCurrentPosition().then((resp) => {
      this.addressLatitude = resp.coords.latitude;
      this.addressLongitude = resp.coords.longitude;

      this.storage.set('savedAddressLat', this.addressLatitude);
      this.storage.set('savedAddressLng', this.addressLongitude);

      this.GeocodeService.convertLatLong(this.addressLatitude, this.addressLongitude).subscribe((json) => {
        this.currentAddress = json;
        if (this.currentAddress.results[0]) {
          this.currentAddress = this.currentAddress.results[0].formatted_address;
          this.storage.set('savedAddress', this.currentAddress);

          this.dismissLoader();
          this.getAllMeetingsAfterLocate();
        } else {
          this.dismissLoader();
          this.currentAddress = 'Location not found';
        }
      });

    }).catch((error) => {
      console.log('Error getting location', error);

      this.currentAddress = 'Location not found';
      this.dismissLoader();
    });
  }

  getAllMeetings(ev: Event) {
    this.radius = (ev as RangeCustomEvent).detail.value
    this.presentLoader("")
    this.MeetingListService.getAddressMeetings(this.addressLatitude, this.addressLongitude, this.radius).then((response) => {
      this.addressMeetingList = response.data;
      this.isLoaded = true;
      this.dismissLoader();
    });
  }

}

