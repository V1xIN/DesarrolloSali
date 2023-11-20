import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BDService } from 'src/app/services/bd.service'; // Importa el servicio necesario
import { Viaje } from 'src/app/services/viaje.service';

@Component({
  selector: 'app-pprincipal',
  templateUrl: './pprincipal.page.html',
  styleUrls: ['./pprincipal.page.scss'],
})
export class PprincipalPage implements OnInit {
  viajes: any = [];

  constructor(private bdService: BDService, private router: Router) {}

  ngOnInit() {
    // Suscribe a los cambios en la lista de viajes del servicio
    this.bdService.fetchViaje().subscribe((viajes) => {
      this.viajes = viajes;
    });
  }
  verInformacion(viaje: Viaje) {
    this.router.navigate(['/infoviaje', { viajeId: viaje.idViaje }]);
  }
  
}
