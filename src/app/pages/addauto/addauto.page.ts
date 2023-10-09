import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addauto',
  templateUrl: './addauto.page.html',
  styleUrls: ['./addauto.page.scss'],
})
export class AddautoPage implements OnInit {

  selectedImage: any;
  modelo: string = '';
  patente: string = '';
  nroChasis: string = '';

  errorMessages = {
    modelo: '',
    patente: '',
    nroChasis: '',
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

  validateModel(model: string): void {
    if (!model || model.length < 1 || model.length > 12 || !/^[A-Za-z0-9]+$/.test(model)) {
      this.errorMessages.modelo = 'El modelo debe tener entre 1 y 12 caracteres y puede incluir números y letras.';
    } else {
      this.errorMessages.modelo = '';
    }
  }

  validatePatent(patent: string): void {
    const regexPatent = /^[A-Z]{2}-[A-Z]{2}-[0-9]{2}$/;
    if (!patent || !regexPatent.test(patent)) {
      this.errorMessages.patente = 'La patente debe tener el formato xx-xx-99.';
    } else {
      this.errorMessages.patente = '';
    }
  }

  validateChassis(chassis: string): void {
    const regexChassis = /^[^IOQÑiñ]{1}[A-HJ-NPR-Z0-9]{4}-[A-HJ-NPR-Z0-9]{2}-[0-9]{1}-[A-HJ-NPR-Z0-9]{1}-[0-9]{1}-[0-9]{1}-[0-9]{1}-[0-9]{1}-[0-9]{1}-[0-9]{1}-[0-9]{1}$/;
    if (!chassis || !regexChassis.test(chassis)) {
      this.errorMessages.nroChasis = 'El número de chasis no es válido.';
    } else {
      this.errorMessages.nroChasis = '';
    }
  }

  areAllValid(): boolean {
    return (
      this.selectedImage !== '' &&
      this.errorMessages.modelo === '' &&
      this.errorMessages.patente === '' &&
      this.errorMessages.nroChasis === ''
    );
  }

  agregarAuto(): void {
    this.resetErrorMessages();

    if (!this.areAllValid()) {
      console.log("Las validaciones han fallado");
      return;
    }

    console.log("Auto agregado exitosamente");
  }

  resetErrorMessages(): void {
    this.errorMessages = {
      modelo: '',
      patente: '',
      nroChasis: '',
    };
  }

  constructor() { }

  ngOnInit() {
  }
}
