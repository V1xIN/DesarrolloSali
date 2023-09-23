import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage {
  email: string = '';
  password: string = '';
  errorMessages: any = {};

  loginForm: FormGroup;
  showPassword: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    // Configuración del formulario con validadores
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
    });
  }

  // Método para verificar si el formulario es válido en su conjunto
  isValidForm(): boolean {
    const isEmailValid = this.validateEmail();
    const isPasswordValid = this.validatePassword();
    return isEmailValid && isPasswordValid;
  }

  // Método para iniciar sesión
  iniciarSesion(): void {
    this.resetErrorMessages();

    if (!this.isValidForm()) {
      console.log("Las validaciones han fallado");
      return;
    }

    // Lógica para iniciar sesión
    console.log("Iniciar sesión exitoso");
  }

  // Método para restablecer los mensajes de error
  resetErrorMessages(): void {
    this.errorMessages = {};
  }

  // Validación de correo electrónico
  validateEmail(): boolean {
    const emailControl = this.loginForm.get('email');
    if (!emailControl) {
      return false; // Control de correo electrónico no encontrado
    }
  
    const isValid = emailControl.valid;
  
    if (!isValid) {
      this.errorMessages.email = "El correo electrónico debe ser válido.";
    } else {
      delete this.errorMessages.email;
    }
  
    return isValid;
  }
  
  // Validación de contraseña
  validatePassword(): boolean {
    const passwordControl = this.loginForm.get('password');
    if (!passwordControl) {
      return false; // Control de contraseña no encontrado
    }
  
    const password = passwordControl.value;
  
    const lengthCheck = password.length >= 6 && password.length <= 12;
    const uppercaseCheck = /[A-Z]/.test(password);
    const lowercaseCheck = /[a-z]/.test(password);
    const numberCheck = /\d/.test(password);
    const specialCharacterCheck = /[@$!%*?&]/.test(password);
    const noWhitespaceCheck = /^\S+$/.test(password);
    const noConsecutiveCheck = !/(.)\1/.test(password);
    const noRepeatingCheck = !/(.)\1\1/.test(password);
  
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
  
    const errorMessages = [];
  
    if (!isValid) {
      if (!lengthCheck) {
        errorMessages.push("La contraseña debe tener entre 6 y 12 caracteres.");
      }
      if (!uppercaseCheck) {
        errorMessages.push("La contraseña debe contener al menos una letra mayúscula.");
      }
      if (!lowercaseCheck) {
        errorMessages.push("La contraseña debe contener al menos una letra minúscula.");
      }
      if (!numberCheck) {
        errorMessages.push("La contraseña debe contener al menos un número.");
      }
      if (!specialCharacterCheck) {
        errorMessages.push("La contraseña debe contener al menos un carácter especial: @$!%*?&.");
      }
      if (!noWhitespaceCheck) {
        errorMessages.push("La contraseña no debe contener espacios en blanco.");
      }
      if (!noConsecutiveCheck) {
        errorMessages.push("La contraseña no puede contener caracteres repetidos consecutivamente.");
      }
      if (!noRepeatingCheck) {
        errorMessages.push("La contraseña no puede contener tres caracteres repetidos consecutivamente.");
      }
    }
  
    this.errorMessages.password = errorMessages.join('\n'); // Usamos "\n" para nuevas líneas
  
    return isValid;
  }
  
  // Método para alternar la visibilidad de la contraseña
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
