import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PprincipalPage } from './pprincipal.page';

const routes: Routes = [
  {
    path: '',
    component: PprincipalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PprincipalPageRoutingModule {}
