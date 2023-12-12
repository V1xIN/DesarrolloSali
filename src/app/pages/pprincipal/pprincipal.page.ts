import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BDService } from 'src/app/services/bd.service'; // Importa el servicio necesario


@Component({
  selector: 'app-pprincipal',
  templateUrl: './pprincipal.page.html',
  styleUrls: ['./pprincipal.page.scss'],
})
export class PprincipalPage implements OnInit {
  usuario: any;
  viajes: any;
  arreglocomunas: any;
  arregloSedes: any;
  constructor(private bdService: BDService, private router: Router) {
  }

  verInformacion(v:any){
    let navigationExtras : NavigationExtras = {
      state: {
        idViajeenv: v.idViaje,
        fechaViajeenv: v.fechaViaje,
        horaViajeenv: v.horaViaje,
        asientosenv: v.asientos,
        costoenv: v.costo,
        idAuto_FKenv: v.idAuto_FK,
        idSede_FKenv: v.idSede_FK,
        idcomuna_FKenv: v.idcomuna_FK
      }
    }
    this.router.navigate(['/infoviaje'], navigationExtras);

  }

  ngOnInit() {
    this.bdService.bdState().subscribe((res) => {
      if (res) {
        this.bdService.fetchViaje().subscribe((viajes2) => {
          this.viajes = viajes2;
        });
        this.bdService.fetchComuna().subscribe((comu) => {
          this.arreglocomunas = comu;
        });
        this.bdService.fetchSedes().subscribe((sedes) => {
          this.arregloSedes = sedes;
        });
        this.bdService.fetchUsuario().subscribe(data=>{
          this.usuario = data;
        });
      }
    });
    // Suscribe a los cambios en la lista de viajes del servicio
  }
}
