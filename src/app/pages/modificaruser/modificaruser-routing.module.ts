import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModificaruserPage } from './modificaruser.page';

const routes: Routes = [
  {
    path: '',
    component: ModificaruserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModificaruserPageRoutingModule {}
