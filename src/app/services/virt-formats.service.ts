import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class VirtFormatsService {

  getApiUrlVirtFormats = 'https://bmlt.virtual-na.org/main_server/client_interface/json/?switcher=GetFormats';
  constructor() { }

  async getAllVirtFormats() {
    const data = await CapacitorHttp.get({url: this.getApiUrlVirtFormats});
    return JSON.parse(data.data);
  }
}
