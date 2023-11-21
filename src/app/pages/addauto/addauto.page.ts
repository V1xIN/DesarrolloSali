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
    // Obtén el Rut del usuario actual
    this.bd.obtenerUsuarioActual().subscribe(
      (usuarios) => {
        // Verifica si hay usuarios y si tiene el Rut
        if (usuarios.length > 0 && usuarios[0].rut) {
          const rut_FK = usuarios[0].rut;

          // Llamas al método buscarAutoPorRut del servicio de base de datos
          this.bd.buscarAutoPorRut(rut_FK).subscribe(
            (autos) => {
              // Verifica el número de autos
              if (autos.length < 2000000) {
                // Aún puedes agregar más autos
                // Llamas al método insertarAuto del servicio de base de datos
                this.bd.insertarAuto(this.patente, this.color, this.marca, this.modelo, rut_FK);

                // Muestra una alerta o realiza otras acciones si es necesario
                this.bd.presentAlert('Auto agregado correctamente');

                // Redirige a la página principal
                this.router.navigate(['/perfil']);
              } else {
                // Ya alcanzaste el límite de autos, muestra un mensaje o realiza otras acciones
                this.bd.presentAlert('No puedes agregar más autos. Has alcanzado el límite.');
              }
            },
            (error) => {
              // Manejo de errores
              console.error('Error al buscar autos por rut:', error);
            }
          );
        } else {
          // No se pudo obtener el Rut del usuario actual
          console.error('No se pudo obtener el Rut del usuario actual');
        }
      },
      (error) => {
        // Manejo de errores al obtener el usuario actual
        console.error('Error al obtener usuario actual:', error);
      }
    );
  }
}
