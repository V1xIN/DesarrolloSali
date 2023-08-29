import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoviajePageRoutingModule } from './infoviaje-routing.module';

import { InfoviajePage } from './infoviaje.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoviajePageRoutingModule
  ],
  declarations: [InfoviajePage]
})
export class InfoviajePageModule {}
