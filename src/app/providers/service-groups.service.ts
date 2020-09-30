import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';

/*
  Generated class for the ServiceGroupsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceGroupsProvider {

  getApiUrlServiceGroups = 'https://tomato.bmltenabled.org/main_server/client_interface/json/?switcher=GetServiceBodies&callingApp=bmlt_search_3_ionic';
  getApiUrlVirtServiceGroups = 'https://bmlt.virtual-na.org/main_server/client_interface/json/?switcher=GetServiceBodies&callingApp=bmlt_search_3_ionic';

  constructor(
    private http: HttpClient,
    private httpCors: HTTP) {
  }

  getAllServiceGroups() {
    return this.http.get(this.getApiUrlServiceGroups);
  }

  async getAllVirtServiceGroups() {
    const data = await this.httpCors.get(this.getApiUrlVirtServiceGroups, {}, {});
    return JSON.parse(data.data);
  }

}
