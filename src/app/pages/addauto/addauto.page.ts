import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';
import { BDService } from 'src/app/services/bd.service';
import { Auto } from 'src/app/services/auto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addauto',
  templateUrl: './addauto.page.html',
  styleUrls: ['./addauto.page.scss'],
})
export class AddautoPage implements OnInit {

  selectedImage: any;
  modelo: string = '';
  patente: string = '';
  numeroChasis: string = '';
  image2: any;
  escogerMarcas: any;
  escogerColores: any;
  marca: any;
  color: any;

  errorMessages = {
    modelo: '',
    patente: '',
    nroChasis: '',
  };

  constructor(
    private alertController: AlertController,
    private bd: BDService,
    private router: Router
  ) { }

  takePicture = async () => {
    const image2 = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    this.image2 = image2.dataUrl;
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

  validateModel(model: string): boolean {
    if (!model || model.length < 1 || model.length > 12 || !/^[A-Za-z0-9]+$/.test(model)) {
      this.errorMessages.modelo = 'El modelo debe tener entre 1 y 12 caracteres y puede incluir números y letras.';
      this.showAlert(this.errorMessages.modelo);
      return false;
    } else {
      this.errorMessages.modelo = '';
      return true;
    }
  }

  validatePatent(patent: string): boolean {
    const regexPatent = /^[A-Z]{2}-[A-Z]{2}-[0-9]{2}$/;
    if (!patent || !regexPatent.test(patent)) {
      this.errorMessages.patente = 'La patente debe tener el formato xx-xx-99.';
      this.showAlert(this.errorMessages.patente);
      return false;
    } else {
      this.errorMessages.patente = '';
      return true;
    }
  }

  /*validateChassis(chassis: string): boolean {
    const regexChassis = /^[^IOQÑiñ]{1}[A-HJ-NPR-Z0-9]{4}-[A-HJ-NPR-Z0-9]{2}-[0-9]{1}-[A-HJ-NPR-Z0-9]{1}-[0-9]{1}-[0-9]{1}-[0-9]{1}-[0-9]{1}-[0-9]{1}-[0-9]{1}-[0-9]{1}$/;
    if (!chassis || !regexChassis.test(chassis)) {
      this.errorMessages.nroChasis = 'El número de chasis no es válido.';
      this.showAlert(this.errorMessages.nroChasis);
      return false;
    } else {
      this.errorMessages.nroChasis = '';
      return true;
    }
  }*/

  areAllValid(): boolean {
    return (
      this.selectedImage !== '' &&
      this.validateModel(this.modelo) &&
      this.validatePatent(this.patente) 
    );
  }

  agregarAuto(): void {
    this.resetErrorMessages();

    if (!this.areAllValid()) {
      console.log("Las validaciones han fallado");
      return;
    }

    // Crear un objeto Auto con los datos del formulario
    const nuevoAuto: Auto = {
      idAuto: '',
      modelo: this.modelo,
      patente: this.patente,
      color: this.color,
      marca: this.marca,
      numeroChasis: this.numeroChasis,
      rut_FK: '',
    };

    // Llamar a la función insertarAuto del servicio BDService
    this.bd.insertarAuto(nuevoAuto)
      .then(() => {
        // Mostrar alerta de registro exitoso
        this.showRegistrationSuccessAlert();

        // Restablecer los campos del formulario después del registro exitoso
        this.resetForm();

        // Redirigir al perfil
        this.router.navigate(['/perfil']);  // Ajusta la ruta según tu configuración

        // Puedes agregar más lógica según tus necesidades
      })
      .catch((error) => {
        // Mostrar alerta de error en la inserción
        this.showAlert('Error al agregar auto: ' + error);
      });
  }

  resetForm(): void {
    this.modelo = '';
    this.patente = '';
    this.numeroChasis = '';
    this.selectedImage = '';
    this.marca = '';
    this.color = '';
  }

  resetErrorMessages(): void {
    this.errorMessages = {
      modelo: '',
      patente: '',
      nroChasis: '',
    };
  }

  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error de Validación',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async showRegistrationSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Registro exitoso',
      message: '¡Auto agregado con éxito!',
      buttons: ['OK'],
    });
    await alert.present();
  }

  ngOnInit() {
    this.bd.bdState().subscribe((res) => {
      if (res) {
        this.bd.fetchAuto().subscribe((datos) => {
          this.escogerColores = datos;
          this.escogerMarcas = datos;
        });
      }
    });
  }
}
