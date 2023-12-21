import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VirtMeetingsPage } from './virt-meetings.page';

const routes: Routes = [
  {
    path: '',
    component: VirtMeetingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VirtMeetingsPageRoutingModule {}
