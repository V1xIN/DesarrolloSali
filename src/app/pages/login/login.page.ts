import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  errorMessages: any = {};

  constructor() {}

  validateEmail(): boolean {
    // Correo electrónico:
    if (!this.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      this.errorMessages.email = 'El correo electrónico debe contener @ y .';
      return false;
    } else {
      this.errorMessages.email = '';
      return true;
    }
  }

  validatePassword(): boolean {
    // Contraseña
    if (this.password.length < 8) {
      this.errorMessages.password = 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número';
      return false;
    } else if (!/[A-Z]/.test(this.password) || !/[a-z]/.test(this.password) || !/[0-9]/.test(this.password)) {
      this.errorMessages.password = 'La contraseña debe tener al menos 8 caracteres';
      return false;
    } else {
      this.errorMessages.password = '';
      return true;
    }
  }

  areAllValid(): boolean {
    return this.validateEmail() && this.validatePassword();
  }

  registrar(): void {
    this.resetErrorMessages(); // Reiniciar los mensajes de error antes de realizar nuevas validaciones

    if (!this.areAllValid()) {
      console.log("Las validaciones han fallado");
      return;
    }

    console.log("Registro exitoso");
  }

  resetErrorMessages(): void {
    this.errorMessages = {}; // Reiniciar los mensajes de error
  }
}
