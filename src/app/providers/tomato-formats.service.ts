import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class TomatoFormatsService {

  tomatoBMLT = 'https://tomato.bmltenabled.org/main_server/client_interface/json/';
  tomatoREST = 'https://tomato.bmltenabled.org/rest/v1/formats/?id__in=';

  constructor(private httpCors: HTTP) {}

  async getFormatNamesByID(uniqueIDs: Set<string>, language) {
    const formatNamesByID = {};
    
    const formatsApi = this.tomatoREST + Array.from(uniqueIDs).join(",");
    const data = await this.httpCors.get(formatsApi, {}, {});
    const jsonData = JSON.parse(data.data);

    for (const format of jsonData.results) {
      const urlPieces = format.url.split("/");
      const formatID = urlPieces[urlPieces.length - 2];

      let formatName = format.translatedformats.filter(i => i.language === language);
      if (formatName.length) {
        if (formatName[0].name === undefined) {
          formatName = format.translatedformats.filter(i => i.language === 'en');
        }
        if (formatName.length && formatName[0].name) {
          formatNamesByID[formatID] = formatName[0].name;
        }
      }
    }

    return formatNamesByID;
  }

  setExplodedFormatsOnMeetingList(meetingList, formatLanguage) {
    const uniqueFormatIDs = new Set<string>();
    for (const meeting of meetingList) {
      for (const formatID of meeting?.format_shared_id_list.split(",") || []) {
        uniqueFormatIDs.add(formatID);
      }
    }

    this.getFormatNamesByID(uniqueFormatIDs, formatLanguage).then((formatNamesByID) => {
      for (const meeting of meetingList) {
        let formats = '';
        for (const formatID of meeting?.format_shared_id_list?.split(",") || []) {
          const name = formatNamesByID[formatID];
          if (name) {
            formats = `${formats}${name}. `
          }
        }
        meeting.formats_exploded = formats.trim();
      }
    });
  }
}
