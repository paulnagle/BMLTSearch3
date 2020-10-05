import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class TomatoFormatsService {

  tomatoBMLT = 'https://tomato.bmltenabled.org/main_server/client_interface/json/';
  tomatoREST = 'https://tomato.bmltenabled.org/rest/v1/formats/';

  constructor(private httpCors: HTTP) {}

  async getFormatByID(listOfIds, language) {

    const splitFormats = listOfIds.split(',');
    let responseString = '';

    for (let format of splitFormats) {
      const singleFormatApi = this.tomatoREST + format + '?format=json';
      const data = await this.httpCors.get(singleFormatApi, {}, {});
      const jsonData = JSON.parse(data.data);
      let formatName = jsonData.translatedformats.filter(i => i.language === language);
      if (formatName[0].name === null) {
        formatName = jsonData.translatedformats.filter(i => i.language === 'en');
      }
      responseString += formatName[0].name + ', ';
    }
    return responseString;
  }


  private filterByValue(array, searchString) {
    return array.filter(o => Object.keys(o).some(k => o[k].toLowerCase().includes(searchString.toLowerCase())));
  }


}
