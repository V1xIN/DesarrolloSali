import { Component, OnInit } from '@angular/core';
import { SmsService } from 'src/app/services/sms.service';
import { BDService } from 'src/app/services/bd.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperacontra',
  templateUrl: './recuperacontra.page.html',
  styleUrls: ['./recuperacontra.page.scss'],
})
export class RecuperacontraPage implements OnInit {
  public alertButtons = ['OK'];
  public numeroTelefono: string = '';
  public codigoRecibido: string = '';
  public codigoEnviado: boolean = false;
  private codigoGenerado: string = ''; // Agregada variable para almacenar el código generado

  constructor(private smsService: SmsService, private bdService: BDService, private router: Router) {}

  ngOnInit() {}

  enviarCodigoRecuperacion() {
    // Lógica para generar un código y enviarlo por SMS
    this.codigoGenerado = this.generarCodigoAleatorio();

    // Llama al servicio para enviar el SMS
    this.smsService.sendSms(this.numeroTelefono, this.codigoGenerado).subscribe(
      (respuesta) => {
        // Maneja la respuesta si es necesario
        console.log('Mensaje SMS enviado con éxito:', respuesta);

        // Muestra una alerta de éxito o realiza otras acciones necesarias
        this.mostrarAlerta('Código enviado con éxito. Revisa tu mensaje.');

        // Cambia la bandera para mostrar la sección de código enviado
        this.codigoEnviado = true;
      },
      (error) => {
        // Maneja el error si ocurre algún problema
        console.error('Error al enviar el mensaje SMS:', error);

        // Muestra una alerta de error o realiza otras acciones necesarias
        this.mostrarAlerta('Error al enviar el código. Inténtalo de nuevo.');
      }
    );
  }

  verificarCodigo() {
    if (this.codigoRecibido === this.codigoGenerado) {
      // Actualiza la contraseña en la base de datos
      const nuevaContraseña = '...'; // Reemplaza '...' con la nueva contraseña
      const rutUsuario = '...'; // Reemplaza '...' con el rut del usuario
  
      this.bdService.actualizarContraseñaNueva(rutUsuario, nuevaContraseña).then(
        () => {
          // Muestra una alerta de éxito o realiza otras acciones necesarias
          this.mostrarAlerta('Contraseña actualizada con éxito.');
  
          // Redirige a la página de login
          this.router.navigate(['/login']);
        },
        (error) => {
          // Muestra una alerta de error o realiza otras acciones necesarias
          this.mostrarAlerta('Error al actualizar la contraseña. Inténtalo de nuevo.');
        }
      );
    } else {
      // Muestra una alerta de error o realiza otras acciones necesarias
      this.mostrarAlerta('Código incorrecto. Inténtalo de nuevo.');
    }
  }
  

  // Función para generar un código aleatorio (puedes personalizarla según tus necesidades)
  private generarCodigoAleatorio(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  // Método para actualizar la contraseña en la base de datos (reemplaza con tu lógica)
  private actualizarContraseñaNueva() {
    // Agrega la lógica necesaria para actualizar la contraseña en la base de datos
  }

  // Función para mostrar una alerta
  private mostrarAlerta(mensaje: string) {
    // Tu lógica para mostrar una alerta en la interfaz de usuario
    // Puedes usar Ionic AlertController u otras opciones según tu diseño
  }
}
