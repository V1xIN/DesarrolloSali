import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuperacontraPageRoutingModule } from './recuperacontra-routing.module';

import { RecuperacontraPage } from './recuperacontra.page';
import { IconoComponenteComponent } from 'src/app/components/icono-componente/icono-componente.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuperacontraPageRoutingModule
  ],
  declarations: [RecuperacontraPage, IconoComponenteComponent]
})
export class RecuperacontraPageModule {}
