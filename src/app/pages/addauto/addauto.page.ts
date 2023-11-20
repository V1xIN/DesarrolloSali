import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';
import { BDService } from 'src/app/services/bd.service';
import { Auto } from 'src/app/services/auto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addauto',
  templateUrl: './addauto.page.html',
  styleUrls: ['./addauto.page.scss'],
})
export class AddautoPage implements OnInit {

  modelo: string = '';
  patente: string = '';
  marca: any;
  color: any;
  rut_FK: any;

  constructor(
    private alertController: AlertController,
    private bd: BDService,
    private router: Router
  ) { }


 

  

  ngOnInit() {
    this.bd.bdState().subscribe((res) => {
      if (res) {
        this.bd.fetchAuto().subscribe((datos) => {
        });
      }
    });
    
  }
  insertarAuto(){
    this.bd.insertarAuto(this.patente,this.color,this.marca,this.modelo,this.rut_FK);
    this.bd.presentAlert("Auto Agregado");
    this.router.navigate(['/perfil']);
  } 
}