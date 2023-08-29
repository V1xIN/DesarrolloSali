import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoviajePage } from './infoviaje.page';

const routes: Routes = [
  {
    path: '',
    component: InfoviajePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoviajePageRoutingModule {}
