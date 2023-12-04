import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BDService } from 'src/app/services/bd.service'; // Importa el servicio necesario
import { Viaje } from 'src/app/services/viaje';


@Component({
  selector: 'app-pprincipal',
  templateUrl: './pprincipal.page.html',
  styleUrls: ['./pprincipal.page.scss'],
})
export class PprincipalPage implements OnInit {
  viajes: any;

  constructor(private bdService: BDService, private router: Router) {}

  ngOnInit() {
    this.bdService.bdState().subscribe((res) => {
      if (res) {
        this.bdService.fetchViaje().subscribe((viajes2) => {
          this.viajes = viajes2;
        });
      }
    });
    // Suscribe a los cambios en la lista de viajes del servicio
  }
  verInformacion(viaje: Viaje) {
    this.router.navigate(['/infoviaje', { viajeId: viaje.idViaje }]);
  }
  
}
