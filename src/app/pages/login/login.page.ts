import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  errorMessages: any = {};
  isLoginInProgress: boolean = false;

  // Define propiedades para controlar si se ha mostrado el mensaje de error de cada campo
  emailErrorShown: boolean = false;
  passwordErrorShown: boolean = false;

  constructor(private alertController: AlertController, private router: Router) {}

  validateEmail() {
    if (!/\S+@\S+\.\S+/.test(this.email)) {
      this.errorMessages.email = 'Correo electrónico no válido. Debe contener un "@" y un dominio válido.';
      if (!this.emailErrorShown) {
        this.showAlert('Error de Validación', this.errorMessages.email);
        this.emailErrorShown = true;
      }
    } else {
      this.errorMessages.email = '';
      this.emailErrorShown = false;
    }
  }

  validatePassword() {
    if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^&+=!])(?!\s)(?!.*([0-9])\1{5,}).{6,20}/.test(this.password)) {
      this.errorMessages.password = 'Contraseña no válida. Debe cumplir con los criterios de seguridad.';
      if (!this.passwordErrorShown) {
        this.showAlert('Error de Validación', this.errorMessages.password);
        this.passwordErrorShown = true;
      }
    } else {
      this.errorMessages.password = '';
      this.passwordErrorShown = false;
    }
  }

  // Función para mostrar alerta de validación
  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  // Función para validar si todos los campos son válidos
  areAllValid(): boolean {
    // Verifica que todos los campos no tengan errores
    return !this.errorMessages.email && !this.errorMessages.password;
  }

  async login() {
    this.validateEmail();
    this.validatePassword();

    if (this.areAllValid()) {
      // Lógica para iniciar sesión
      this.showAlert('Inicio de sesión exitoso', '¡Bienvenido!');
      this.router.navigate(['/pprincipal']);
    } else {
      const alert = await this.alertController.create({
        header: 'Error de Validación',
        message: 'Por favor, complete todos los campos correctamente antes de iniciar sesión.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
