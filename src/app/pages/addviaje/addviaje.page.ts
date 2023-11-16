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
  idViaje = '';
  fechaViaje = '';
  horaViaje = '';
  asientos = '';
  costo = '';
  idAuto_FK = '';
  Sede: any;
  Comuna: any;
  arreglocomunas: any;
  arregloSedes: any;


  constructor(private alertController: AlertController,
    private router: Router,
    private bd: BDService){ }

  ngOnInit() {
    this.bd.bdState().subscribe((res) => {
      if (res) {
        this.bd.fetchComuna().subscribe((datos) => {
          this.arreglocomunas = datos;
        });
        this.bd.fetchSedes().subscribe((datos2) => {
          this.arregloSedes = datos2;
        });
      }
    });
  }

}
