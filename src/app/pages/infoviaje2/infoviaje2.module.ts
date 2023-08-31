import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Infoviaje2PageRoutingModule } from './infoviaje2-routing.module';

import { Infoviaje2Page } from './infoviaje2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Infoviaje2PageRoutingModule
  ],
  declarations: [Infoviaje2Page]
})
export class Infoviaje2PageModule {}
