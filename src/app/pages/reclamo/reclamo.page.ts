import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-reclamo',
  templateUrl: './reclamo.page.html',
  styleUrls: ['./reclamo.page.scss'],
})
export class ReclamoPage implements OnInit {

  
  constructor(private alertController: AlertController) { }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Reclamo recibido',
      subHeader: 'Su reclamo a sido derivado con la administracion',
      message: 'Gracias por su comentario',
      buttons: ['OK'],
    });

    await alert.present();
  }


  ngOnInit() {
  }

}
