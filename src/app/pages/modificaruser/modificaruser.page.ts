import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BDService } from 'src/app/services/bd.service';

@Component({
  selector: 'app-modificaruser',
  templateUrl: './modificaruser.page.html',
  styleUrls: ['./modificaruser.page.scss'],
})
export class ModificaruserPage {
  selectedImage: any;
  nombre: string = '';
  apellido: string = '';
  email: string = '';
  telefono: string = '';
  direccion: string = '';
  errorMessages: any = {};
  isModificationInProgress: boolean = false;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private bdService: BDService // Agrega tu servicio aquí
  ) {}

  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  validateNombre() {
    if (
      /[^a-zA-ZáéíóúÁÉÍÓÚ\s]/.test(this.nombre) ||
      this.nombre.length < 1 ||
      this.nombre.length > 14
    ) {
      this.errorMessages.nombre =
        'Nombre no válido. Debe contener solo letras y tener entre 1 y 14 caracteres.';
    } else {
      this.errorMessages.nombre = '';
    }
  }

  validateApellido() {
    if (
      /[^a-zA-ZáéíóúÁÉÍÓÚ\s]/.test(this.apellido) ||
      this.apellido.length < 1 ||
      this.apellido.length > 14
    ) {
      this.errorMessages.apellido =
        'Apellido no válido. Debe contener solo letras y tener entre 1 y 14 caracteres.';
    } else {
      this.errorMessages.apellido = '';
    }
  }

  validateEmail() {
    if (!/\S+@\S+\.\S+/.test(this.email)) {
      this.errorMessages.email =
        'Correo electrónico no válido. Debe contener un "@" y un dominio válido.';
    } else {
      this.errorMessages.email = '';
    }
  }

  validateTelefono() {
    if (!/^\d{9}$/.test(this.telefono)) {
      this.errorMessages.telefono =
        'Teléfono no válido. Debe tener 9 dígitos sin espacios ni otros caracteres.';
    } else {
      this.errorMessages.telefono = '';
    }
  }

  validateDireccion() {
    if (
      !/^[a-z\s\d]{1,12}(?:[^\d]*\d){3,4}$/.test(this.direccion)
    ) {
      this.errorMessages.direccion =
        'Dirección no válida. Debe estar en minúsculas, contener entre 1 y 12 caracteres y tener 3 o 4 números.';
    } else {
      this.errorMessages.direccion = '';
    }
  }

  // Función para mostrar alerta de validación
  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error de modificacion',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Función para mostrar alerta de modificación exitosa
  async showModificationSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Modificación exitosa',
      message: 'Los datos del usuario se han modificado correctamente.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Función para validar si al menos un campo es válido
  isAnyFieldValid(): boolean {
    return (
      !this.errorMessages.nombre ||
      !this.errorMessages.apellido ||
      !this.errorMessages.email ||
      !this.errorMessages.telefono ||
      !this.errorMessages.direccion
    );
  }

  async modificaruser() {
    // Validación de campos
    this.validateNombre();
    this.validateApellido();
    this.validateEmail();
    this.validateTelefono();
    this.validateDireccion();
  
    // Verifica que al menos un campo sea válido
    if (this.isAnyFieldValid()) {
      // Obtener datos del usuario actual
    } else {
      const alert = await this.alertController.create({
        header: 'Error de modificación',
        message: 'Por favor, complete al menos un campo correctamente antes de modificar',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}  