import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoIHaveTheBmltPage } from './do-i-have-the-bmlt.page';

const routes: Routes = [
  {
    path: '',
    component: DoIHaveTheBmltPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoIHaveTheBmltPageRoutingModule {}
