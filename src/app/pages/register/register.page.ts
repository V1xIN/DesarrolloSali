import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  selectedImage: any;
  nombre: string = '';
  apellido: string = '';
  rut: string = '';
  email: string = '';
  password: string = '';
  reppassword: string = '';
  telefono: string = '';
  direccion: string = '';
  errorMessages: any = {};
  image: any;

  constructor(private alertController: AlertController) {}

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });

    // image.dataUrl contendrá el Data URL de la imagen capturada.
    this.image = image.dataUrl;
  };

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
    if (/[^a-zA-ZáéíóúÁÉÍÓÚ\s]/.test(this.nombre) || this.nombre.length < 1 || this.nombre.length > 14) {
      this.errorMessages.nombre = 'Nombre no válido. Debe contener solo letras y tener entre 1 y 14 caracteres.';
      this.showAlert(this.errorMessages.nombre);
    } else {
      this.errorMessages.nombre = '';
    }
  }

  validateApellido() {
    if (/[^a-zA-ZáéíóúÁÉÍÓÚ\s]/.test(this.apellido) || this.apellido.length < 1 || this.apellido.length > 14) {
      this.errorMessages.apellido = 'Apellido no válido. Debe contener solo letras y tener entre 1 y 14 caracteres.';
      this.showAlert(this.errorMessages.apellido);
    } else {
      this.errorMessages.apellido = '';
    }
  }

  validateRut() {
    if (!/^(\d{7,8}([0-9]|K))$/.test(this.rut)) {
      this.errorMessages.rut = 'Rut no válido. Debe contener 8 o 9 dígitos seguidos de un número o la letra K.';
      this.showAlert(this.errorMessages.rut);
    } else {
      this.errorMessages.rut = '';
    }
  }

  validateEmail() {
    if (!/\S+@\S+\.\S+/.test(this.email)) {
      this.errorMessages.email = 'Correo electrónico no válido. Debe contener un "@" y un dominio válido.';
      this.showAlert(this.errorMessages.email);
    } else {
      this.errorMessages.email = '';
    }
  }

  validatePassword() {
    if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^&+=!])(?!\s)(?!.*([0-9])\1{5,}).{6,20}/.test(this.password)) {
      this.errorMessages.password = 'Contraseña no válida. Debe cumplir con los criterios de seguridad.';
      this.showAlert(this.errorMessages.password);
    } else {
      this.errorMessages.password = '';
    }
  }

  validateReppassword() {
    if (this.password !== this.reppassword) {
      this.errorMessages.reppassword = 'Las contraseñas no coinciden.';
      this.showAlert(this.errorMessages.reppassword);
    } else {
      this.errorMessages.reppassword = '';
    }
  }

  validateTelefono() {
    if (!/^\d{9}$/.test(this.telefono)) {
      this.errorMessages.telefono = 'Teléfono no válido. Debe tener 9 dígitos sin espacios ni otros caracteres.';
      this.showAlert(this.errorMessages.telefono);
    } else {
      this.errorMessages.telefono = '';
    }
  }

  validateDireccion() {
    if (!/^[a-z\s\d]{3,4}$/.test(this.direccion)) {
      this.errorMessages.direccion = 'Dirección no válida. Debe estar en minúsculas y contener al menos 3 o 4 caracteres.';
      this.showAlert(this.errorMessages.direccion);
    } else {
      this.errorMessages.direccion = '';
    }
  }

  // Función para mostrar alerta de validación
  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error de Validación',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
