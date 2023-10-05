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

    //NOMBRE
    if (!this.nombre.trim()) {
      this.errorMessages.nombre = 'Por favor, ingrese su nombre';
    } else {
      this.errorMessages.nombre = '';
    }
    
    //APELLIDO
    if (!this.apellido.trim()) {
      this.errorMessages.apellido = 'Por favor, ingrese su apellido';
    } else {
      this.errorMessages.apellido = '';
    }

    /////////////RUT
    const rutRegex = /^(\d{7,8})-(\d{1}|[kK])$/;

    if (!rutRegex.test(this.rut)) {
      // Si no coincide con la expresión regular, muestra un mensaje de error
      this.errorMessages.rut = 'RUT inválido. Debe estar en formato xxxxxxxx-x';
    } else {
      // Si es válido, elimina el mensaje de error
      this.errorMessages.rut = '';
    }

    // Correo electrónico:
    if (!this.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      this.errorMessages.email = 'El correo electrónico debe contener @ y .';
    } else {
      this.errorMessages.email = '';
    }


    //CONTRASEÑA

    if (this.password.length < 8) {
      this.errorMessages.password = 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número';
    } else if (!/[A-Z]/.test(this.password) || !/[a-z]/.test(this.password) || !/[0-9]/.test(this.password)) {
      this.errorMessages.password = 'La contraseña debe tener al menos 8 caracteres';
    } else {
      this.errorMessages.password = '';
    }

    //CELULAR

    if (!/^\d{9}$/.test(this.telefono)) {
      this.errorMessages.telefono = 'Número de teléfono no válido Ej: 912345678';
    } else {
      this.errorMessages.telefono = '';
    }

    //DIRECCION
    if (this.direccion.length < 5) {
      this.errorMessages.direccion = 'Ingrese su Direccion, por favor';
      return false;
    } else {
      this.errorMessages.direccion = '';
    }

    return true;
  }


  areAllValid(): boolean {
    return (
      this.selectedImage !== '' &&
      this.validateNombre() 
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