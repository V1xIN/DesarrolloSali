import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Infoviaje2Page } from './infoviaje2.page';

const routes: Routes = [
  {
    path: '',
    component: Infoviaje2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Infoviaje2PageRoutingModule {}
