import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-infoviaje',
  templateUrl: './infoviaje.page.html',
  styleUrls: ['./infoviaje.page.scss'],
})
export class InfoviajePage implements OnInit {
  
  idViaje = "";
  fechaViaje= "";
  horaViaje= "";
  asientos= "";
  costo= "";
  idAuto_FK= "";
  idSede_FK= "";
  idcomuna_FK= "";

  constructor(private router: Router,private activeRoute: ActivatedRoute) {
    this.activeRoute.queryParams.subscribe(res=>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.idViaje = this.router.getCurrentNavigation()?.extras?.state?.['idViajeenv'];
        this.fechaViaje = this.router.getCurrentNavigation()?.extras?.state?.['fechaViajeenv'];
        this.horaViaje = this.router.getCurrentNavigation()?.extras?.state?.['horaViajeenv'];
        this.asientos = this.router.getCurrentNavigation()?.extras?.state?.['asientosenv'];
        this.costo = this.router.getCurrentNavigation()?.extras?.state?.['costoenv'];
        this.idAuto_FK = this.router.getCurrentNavigation()?.extras?.state?.['idAuto_FKenv'];
        this.idSede_FK = this.router.getCurrentNavigation()?.extras?.state?.['idSede_FKenv'];
        this.idcomuna_FK = this.router.getCurrentNavigation()?.extras?.state?.['idcomuna_FKenv'];
      }
      })
   }

  ngOnInit() {
  }

}
