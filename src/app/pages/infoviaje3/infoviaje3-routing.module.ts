import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Infoviaje3Page } from './infoviaje3.page';

const routes: Routes = [
  {
    path: '',
    component: Infoviaje3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Infoviaje3PageRoutingModule {}
