import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  selectedImage: string = '';
  nombre: string = '';
  apellido: string = '';
  rut: string = '';
  email: string = '';
  password: string = '';
  reppassword: string = '';
  telefono: string = '';
  direccion: string = '';
  errorMessages: any = {};

  constructor() {}

  handleFileInput(event: any): void {
    const file = event.target.files[0];
    this.selectedImage = URL.createObjectURL(file);
  }

  validateNombre(): boolean {
    const nombrePattern = /^[A-Z][a-zA-Z]{0,11}$/;
    const isValid = nombrePattern.test(this.nombre);

    if (!isValid) {
      this.errorMessages.nombre = "El nombre debe comenzar con una letra mayúscula y tener entre 1 y 12 caracteres alfabéticos.";
    }

    return isValid;
  }

  validateApellido(): boolean {
    const apellidoPattern = /^[A-Z][a-zA-Z]{0,11}$/;
    const isValid = apellidoPattern.test(this.apellido);

    if (!isValid) {
      this.errorMessages.apellido = "El apellido debe comenzar con una letra mayúscula y tener entre 1 y 12 caracteres alfabéticos.";
    }

    return isValid;
  }

  validateRut(): boolean {
    const rutPattern = /^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9Kk]{1}$/;
    const isValid = rutPattern.test(this.rut);

    if (!isValid) {
      this.errorMessages.rut = "El RUT debe tener el formato correcto, por ejemplo: 12.345.678-9";
    }

    return isValid;
  }

  validateEmail(): boolean {
    const emailPattern = /@/;
    const isValid = emailPattern.test(this.email);

    if (!isValid) {
      this.errorMessages.email = "El correo electrónico debe contener el caracter '@'.";
    }

    return isValid;
  }

  validatePassword(): boolean {
    const lengthCheck = this.password.length >= 6 && this.password.length <= 12;
    const uppercaseCheck = /[A-Z]/.test(this.password);
    const lowercaseCheck = /[a-z]/.test(this.password);
    const numberCheck = /\d/.test(this.password);
    const specialCharacterCheck = /[@$!%*?&]/.test(this.password);
    const noWhitespaceCheck = /^\S+$/.test(this.password);
    const noConsecutiveCheck = !/(.)\1/.test(this.password);
    const noRepeatingCheck = !/(.)\1\1/.test(this.password);

    const isValid = (
      lengthCheck &&
      uppercaseCheck &&
      lowercaseCheck &&
      numberCheck &&
      specialCharacterCheck &&
      noWhitespaceCheck &&
      noConsecutiveCheck &&
      noRepeatingCheck
    );

    if (!isValid) {
      this.errorMessages.password = "La contraseña debe cumplir con ciertas condiciones de seguridad.";
    }

    return isValid;
  }
  validaterepPassword(): boolean {
    const lengthCheck = this.password.length >= 6 && this.reppassword.length <= 12;
    const uppercaseCheck = /[A-Z]/.test(this.reppassword);
    const lowercaseCheck = /[a-z]/.test(this.reppassword);
    const numberCheck = /\d/.test(this.reppassword);
    const specialCharacterCheck = /[@$!%*?&]/.test(this.reppassword);
    const noWhitespaceCheck = /^\S+$/.test(this.reppassword);
    const noConsecutiveCheck = !/(.)\1/.test(this.reppassword);
    const noRepeatingCheck = !/(.)\1\1/.test(this.reppassword);

    const isValid = (
      lengthCheck &&
      uppercaseCheck &&
      lowercaseCheck &&
      numberCheck &&
      specialCharacterCheck &&
      noWhitespaceCheck &&
      noConsecutiveCheck &&
      noRepeatingCheck
    );

    if (!isValid) {
      this.errorMessages.reppassword = "La contraseña debe cumplir con ciertas condiciones de seguridad.";
    }

    return isValid;
  }

  validateTelefono(): boolean {
    const telefonoPattern = /^\+56 9 [0-9]{4} [0-9]{4}$/;
    const isValid = telefonoPattern.test(this.telefono);

    if (!isValid) {
      this.errorMessages.telefono = "El teléfono debe tener el formato correcto, por ejemplo: +56 9 1234 5678";
    }

    return isValid;
  }

  validateDireccion(): boolean {
    const direccionPattern = /^[A-Za-z\s]{1,16}\s[1-9][0-9]{2,3}$/;
    const isValid = direccionPattern.test(this.direccion);

    if (!isValid) {
      this.errorMessages.direccion = "La dirección debe cumplir con ciertas condiciones.";
    }

    return isValid;
  }

  areAllValid(): boolean {
    return (
      this.selectedImage !== '' &&
      this.validateNombre() &&
      this.validateApellido() &&
      this.validateRut() &&
      this.validateEmail() &&
      this.validatePassword() &&
      this.validateTelefono() &&
      this.validateDireccion()
    );
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