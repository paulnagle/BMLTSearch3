import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MeetingListProvider {

  tomatoBMLT = 'https://tomato.bmltenabled.org/main_server/client_interface/json/';

  constructor(public http: HttpClient) {
  }

  getAutoRadiusMeetings(lat, long, radius) {
    const getAutoRadiusMeetingsURL: string = this.tomatoBMLT
      + '?switcher=GetSearchResults&geo_width_km='
      + '-'
      + radius
      + '&long_val='
      + long
      + '&lat_val='
      + lat
      + '&sort_keys=longitude,latitude&callingApp=ionic-bmltapp';
    return this.http.get(getAutoRadiusMeetingsURL);
  }

  getRadiusMeetings(lat, long, radius) {
    const getRadiusMeetingsURL: string = this.tomatoBMLT
      + '?switcher=GetSearchResults'
      + '&data_field_key=longitude,latitude,id_bigint'
      + '&geo_width_km='
      + radius
      + '&long_val='
      + long
      + '&lat_val='
      + lat
      + '&sort_keys=longitude,latitude&callingApp=ionic-bmltapp';
    return this.http.get(getRadiusMeetingsURL);
  }

  getAddressMeetings(lat, long, radius) {
    const getAddressMeetingsURL: string = this.tomatoBMLT
      + '?switcher=GetSearchResults&geo_width_km='
      + '-'
      + radius
      + '&long_val='
      + long
      + '&lat_val='
      + lat
      + '&sort_keys=longitude,latitude&callingApp=ionic-bmltapp';
    return this.http.get(getAddressMeetingsURL);
  }

  getNearestMeeting(lat, long) {
    const getAddressMeetingsURL: string = this.tomatoBMLT
      + '?switcher=GetSearchResults&geo_width_km='
      + '-1'
      + '&long_val='
      + long
      + '&lat_val='
      + lat
      + '&sort_keys=longitude,latitude&callingApp=ionic-bmltapp';
    return this.http.get(getAddressMeetingsURL);
  }

  getMeetingsByAreaProvider(areaID) {
    const getMeetingsByAreaURL: string = this.tomatoBMLT
      + '?switcher=GetSearchResults&services='
      + areaID
      + '&sort_keys=weekday_tinyint,start_time&callingApp=ionic-bmltapp';
    return this.http.get(getMeetingsByAreaURL);

  }

  getSingleMeetingByID(id) {
    const getSingleMeetingByIDURL: string = this.tomatoBMLT
      + '?switcher=GetSearchResults&meeting_ids[]='
      + id;
    return this.http.get(getSingleMeetingByIDURL);
  }

}
