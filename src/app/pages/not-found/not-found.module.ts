import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotFoundPageRoutingModule } from './not-found-routing.module';

import { NotFoundPage } from './not-found.page';

import {MatProgressBarModule} from '@angular/material/progress-bar';
import { IconoComponenteComponent } from 'src/app/components/icono-componente/icono-componente.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotFoundPageRoutingModule,
    MatProgressBarModule
  ],
  declarations: [NotFoundPage,IconoComponenteComponent]
})
export class NotFoundPageModule {}
