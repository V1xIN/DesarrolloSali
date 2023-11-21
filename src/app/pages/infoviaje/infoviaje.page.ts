import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BDService } from 'src/app/services/bd.service';
import { Viaje } from 'src/app/services/viaje.service';

@Component({
  selector: 'app-infoviaje',
  templateUrl: './infoviaje.page.html',
  styleUrls: ['./infoviaje.page.scss'],
})
export class InfoviajePage implements OnInit {
  viaje: Viaje | undefined;

  constructor(private route: ActivatedRoute, private bdService: BDService) {}

  ngOnInit() {
    if (this.route.paramMap) {
      this.route.paramMap.subscribe((params) => {
        const viajeId = params.get('viajeId');
  
        if (viajeId) {
          this.bdService.getViajeById(+viajeId).subscribe(
            (viaje) => {
              if (viaje) {
                this.viaje = viaje;
              } else {
                console.error('No se encontró el viaje por el ID:', viajeId);
                // Manejar el caso en el que no se encuentre el viaje por el ID
              }
            },
            (error) => {
              console.error('Error al obtener el viaje:', error);
              // Manejar el error, mostrar un mensaje al usuario, etc.
            }
          );
        } else {
          console.error('ID de viaje no proporcionado en la ruta.');
          // Manejar el caso en el que no se proporciona un ID de viaje en la ruta
        }
      });
    } else {
      console.error('this.route.paramMap es undefined.');
      // Manejar el caso en el que this.route.paramMap es undefined
    }
  }
  

  confirmarViaje() {
    // Lógica para confirmar el viaje
    if (this.viaje) {
      console.log('Viaje confirmado. Estará en 10 a 25 minutos de espera.');
      // Puedes realizar otras acciones necesarias para confirmar el viaje
    } else {
      console.error('No se puede confirmar el viaje porque no se ha cargado correctamente.');
      // Manejar el caso en el que no se ha cargado el viaje correctamente
    }
  }

  cancelarViaje() {
    // Lógica para cancelar el viaje
    if (this.viaje) {
      console.log('Viaje cancelado. Regresando a la página principal.');
      // Puedes realizar otras acciones necesarias para cancelar el viaje
    } else {
      console.error('No se puede cancelar el viaje porque no se ha cargado correctamente.');
      // Manejar el caso en el que no se ha cargado el viaje correctamente
    }
    // Redireccionar a la página principal
  }
}
