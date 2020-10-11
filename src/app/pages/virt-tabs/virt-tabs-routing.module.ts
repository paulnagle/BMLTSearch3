import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VirtTabsPage } from './virt-tabs.page';

// const routes: Routes = [
//   {
//     path: '',
//     component: VirtTabsPage
//   }
// ];


const routes: Routes = [
  {
    path: 'virt-tabs',
    component: VirtTabsPage,
    children: [
      {
        path: 'list',
        loadChildren: () => import('../virt-meetings/virt-meetings.module').then(m => m.VirtMeetingsPageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('../virt-search/virt-search.module').then(m => m.VirtSearchPageModule)
      },
      {
        path: '',
        redirectTo: 'virt-tabs/list',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'virt-tabs/list',
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VirtTabsPageRoutingModule {}
