import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PprincipalPageRoutingModule } from './pprincipal-routing.module';

import { PprincipalPage } from './pprincipal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PprincipalPageRoutingModule
  ],
  declarations: [PprincipalPage]
})
export class PprincipalPageModule {}
