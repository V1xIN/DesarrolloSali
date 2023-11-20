import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BDService } from 'src/app/services/bd.service';

@Component({
  selector: 'app-addviaje',
  templateUrl: './addviaje.page.html',
  styleUrls: ['./addviaje.page.scss'],
})
export class AddviajePage implements OnInit {

  fechaViaje : any;
  horaViaje : any;
  asientos : any;
  costo : any;
  auto : any;
  Sede: any;
  Comuna: any;
  arreglocomunas: any;
  arregloSedes: any;
  arregloAutos: any;



  constructor(private alertController: AlertController, private router: Router, private bd: BDService) { }


  
  ngOnInit() {
    this.bd.bdState().subscribe((res) => {
      if (res) {
        this.bd.fetchComuna().subscribe((datos) => {
          this.arreglocomunas = datos;
        });
        this.bd.fetchSedes().subscribe((datos2) => {
          this.arregloSedes = datos2;
        });
        this.bd.fetchAuto().subscribe((datos3) => {
          this.arregloAutos = datos3;
        });
      }
    });
  }
  insertarviaje(){
    this.bd.insertarViajes(this.fechaViaje,this.horaViaje,this.asientos,this.costo, this.auto, this.Sede,this.Comuna);
    this.bd.presentAlert("Viaje Agregado");
    this.router.navigate(['/pprincipal']);
  }
}

