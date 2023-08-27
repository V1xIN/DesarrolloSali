import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModificaruserPageRoutingModule } from './modificaruser-routing.module';

import { ModificaruserPage } from './modificaruser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModificaruserPageRoutingModule
  ],
  declarations: [ModificaruserPage]
})
export class ModificaruserPageModule {}
