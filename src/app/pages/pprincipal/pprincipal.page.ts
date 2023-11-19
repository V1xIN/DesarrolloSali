import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BDService } from 'src/app/services/bd.service';

@Component({
  selector: 'app-pprincipal',
  templateUrl: './pprincipal.page.html',
  styleUrls: ['./pprincipal.page.scss'],
})
export class PprincipalPage implements OnInit {

  arregloviajes: any;
   

  


  constructor(private alertController: AlertController,
    private router: Router,
    private bd: BDService) { }

  ngOnInit() {
    this.bd.bdState().subscribe((res) => {
      if (res) {
        this.bd.fetchComuna().subscribe((datos) => {
          this.arregloviajes = datos;
        });
      }
    });
  }

}
