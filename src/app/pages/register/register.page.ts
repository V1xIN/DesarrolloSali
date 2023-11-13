import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BDService } from 'src/app/services/bd.service';
import { Usuario } from 'src/app/services/usuario.service';

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
  rol: any;
  arregloRoles: any;

  image2: any;
  isRegistrationInProgress: boolean = false;

  nombreErrorShown: boolean = false;
  apellidoErrorShown: boolean = false;
  rutErrorShown: boolean = false;
  emailErrorShown: boolean = false;
  passwordErrorShown: boolean = false;
  reppasswordErrorShown: boolean = false;
  telefonoErrorShown: boolean = false;
  direccionErrorShown: boolean = false;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private bd: BDService
  ) {}

  takePicture = async () => {
    const image2 = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
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

  validateNombre() {
    if (
      /[^a-zA-ZáéíóúÁÉÍÓÚ\s]/.test(this.nombre) ||
      this.nombre.length < 1 ||
      this.nombre.length > 14
    ) {
      this.errorMessages.nombre =
        'Nombre no válido. Debe contener solo letras y tener entre 1 y 14 caracteres.';
      this.nombreErrorShown = true;
    } else {
      this.errorMessages.nombre = '';
      this.nombreErrorShown = false;
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
      this.apellidoErrorShown = true;
    } else {
      this.errorMessages.apellido = '';
      this.apellidoErrorShown = false;
    }
  }

  validateRut() {
    if (!/^(\d{7,8}([0-9]|K))$/.test(this.rut)) {
      this.errorMessages.rut =
        'Rut no válido. Debe contener 8 o 9 dígitos seguidos de un número o la letra K.';
      this.rutErrorShown = true;
    } else {
      this.errorMessages.rut = '';
      this.rutErrorShown = false;
    }
  }

  validateEmail() {
    if (!/\S+@\S+\.\S+/.test(this.email)) {
      this.errorMessages.email =
        'Correo electrónico no válido. Debe contener un "@" y un dominio válido.';
      this.emailErrorShown = true;
    } else {
      this.errorMessages.email = '';
      this.emailErrorShown = false;
    }
  }

  validatePassword() {
    if (
      !/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^&+=!])(?!\s)(?!.*([0-9])\1{5,}).{6,20}/.test(
        this.password
      )
    ) {
      this.errorMessages.password =
        'Contraseña no válida. Debe cumplir con los criterios de seguridad.';
      this.passwordErrorShown = true;
    } else {
      this.errorMessages.password = '';
      this.passwordErrorShown = false;
    }
  }

  validateReppassword() {
    if (this.password !== this.reppassword) {
      this.errorMessages.reppassword = 'Las contraseñas no coinciden.';
      this.reppasswordErrorShown = true;
    } else {
      this.errorMessages.reppassword = '';
      this.reppasswordErrorShown = false;
    }
  }

  validateTelefono() {
    if (!/^\d{9}$/.test(this.telefono)) {
      this.errorMessages.telefono =
        'Teléfono no válido. Debe tener 9 dígitos sin espacios ni otros caracteres.';
      this.telefonoErrorShown = true;
    } else {
      this.errorMessages.telefono = '';
      this.telefonoErrorShown = false;
    }
  }

  validateDireccion() {
    if (
      !/^[a-z\s\d]{1,12}(?:[^\d]*\d){3,4}$/.test(this.direccion)
    ) {
      this.errorMessages.direccion =
        'Dirección no válida. Debe estar en minúsculas, contener entre 1 y 12 caracteres y tener 3 o 4 números.';
      this.direccionErrorShown = true;
    } else {
      this.errorMessages.direccion = '';
      this.direccionErrorShown = false;
    }
  }

  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error de Validación',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  areAllValid(): boolean {
    return (
      !this.errorMessages.nombre &&
      !this.errorMessages.apellido &&
      !this.errorMessages.rut &&
      !this.errorMessages.email &&
      !this.errorMessages.password &&
      !this.errorMessages.reppassword &&
      !this.errorMessages.telefono &&
      !this.errorMessages.direccion
    );
  }

  async register() {
    this.validateNombre();
    this.validateApellido();
    this.validateRut();
    this.validateEmail();
    this.validatePassword();
    this.validateReppassword();
    this.validateTelefono();
    this.validateDireccion();
  
    if (this.areAllValid()) {
      // Crear un objeto Usuario con los datos del formulario
      const nuevoUsuario: Usuario = {
        rut: this.rut,
        nombre: this.nombre,
        apellido: this.apellido,
        correo: this.email,
        clave: this.password,
        telefono: this.telefono,
        direccion: this.direccion,
        idrol_FK: '1', // Cambia esto según el ID del rol correspondiente (ejemplo: '1' para Pasajero)
      };
  
      // Llamar a la función insertarUsuario del servicio BDService
      this.bd.insertarUsuario(nuevoUsuario)
        .then(() => {
          // Mostrar alerta de registro exitoso
          this.showRegistrationSuccessAlert();
          
          // Almacenar el rut del usuario registrado
          localStorage.setItem('rutUsuarioRegistrado', this.rut);
          
          this.router.navigate(['/perfil']);
        })
        .catch((error) => {
          // Mostrar alerta de error en la inserción
          this.showAlert('Error al registrar usuario: ' + error);
        });
    } else {
      const alert = await this.alertController.create({
        header: 'Error de Validación',
        message:
          'Por favor, complete todos los campos correctamente antes de registrarse',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
  
  

  async showRegistrationSuccessAlert() {
    const alert = await this.alertController.create({
      header: 'Registro exitoso',
      message: '¡Datos registrados con éxito!',
      buttons: ['OK'],
    });
    await alert.present();
  }

  ngOnInit() {
    this.bd.bdState().subscribe((res) => {
      if (res) {
        this.bd.fetchRol().subscribe((datos) => {
          this.arregloRoles = datos;
        });
      }
    });
  }
}
