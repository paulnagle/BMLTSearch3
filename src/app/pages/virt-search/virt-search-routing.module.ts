import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VirtSearchPage } from './virt-search.page';

const routes: Routes = [
  {
    path: '',
    component: VirtSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VirtSearchPageRoutingModule {}
