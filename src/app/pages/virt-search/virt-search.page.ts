import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoadingService } from 'src/app/services/loading.service';
import { MeetingListService } from '../../services/meeting-list.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-virt-search',
  templateUrl: './virt-search.page.html',
  styleUrls: ['./virt-search.page.scss'],
})
export class VirtSearchPage implements OnInit {

  loader!: Promise<void> | Promise<boolean> | null;
  allVirtMeetings: any = [];
  isLoaded = false;

  constructor(
    private meetingListProvider: MeetingListService,
    private loaderCtrl: LoadingService,
    private translate: TranslateService,
    private storage: StorageService

  ) {

  }

  ngOnInit() {
    this.getAllVirtMeetings();
  }

  getAllVirtMeetings() {
    this.translate.get('FINDING_MTGS').subscribe(value => { this.presentLoader(value); });

    this.meetingListProvider.getAllVirtualMeetings().then((data) => {
      this.allVirtMeetings = data;
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

}
