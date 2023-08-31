import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Infoviaje3PageRoutingModule } from './infoviaje3-routing.module';

import { Infoviaje3Page } from './infoviaje3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Infoviaje3PageRoutingModule
  ],
  declarations: [Infoviaje3Page]
})
export class Infoviaje3PageModule {}
