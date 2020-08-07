import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GeolocateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GeolocateProvider {

  googleAPIKey = '&key=AIzaSyDg5AKBNjMvoBBlLgXpy-dLxLAcVJYpOq8';
  convertLatLongUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
  convertAddressUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';

  constructor(public http: HttpClient) {
  }

  convertLatLong(lat, long) {
    const url = this.convertLatLongUrl + lat + ',' + long + this.googleAPIKey;

    return this.http.get(url);
  }

  convertAddress(address) {
    const url = this.convertAddressUrl + address + this.googleAPIKey;

    return this.http.get(url);
  }
}
