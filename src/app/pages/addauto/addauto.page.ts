import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BDService } from 'src/app/services/bd.service';

@Component({
  selector: 'app-addauto',
  templateUrl: './addauto.page.html',
  styleUrls: ['./addauto.page.scss'],
})
export class AddautoPage implements OnInit {
  marca: any;
  modelo: any;
  patente: any;
  color: any;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private bd: BDService
  ) {}

  ngOnInit() {}

  insertarAuto() {
    // Supongo que obtienes el rut_FK de algún lugar, por ejemplo, desde la sesión del usuario
    const rut_FK = 'rut_del_usuario_actual';

    // Llamas al método insertarAuto del servicio de base de datos
    this.bd.insertarAuto(this.patente, this.color, this.marca, this.modelo, rut_FK);

    // Muestra una alerta o realiza otras acciones si es necesario
    this.bd.presentAlert('Auto agregado correctamente');

    // Redirige a la página principal
    this.router.navigate(['/pprincipal']);
  }
}
