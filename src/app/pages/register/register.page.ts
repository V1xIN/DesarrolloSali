import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  selectedImage: any;

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

  formularioRegistro: FormGroup;

  constructor(public fb: FormBuilder, public AlertController: AlertController) { 

    this.formularioRegistro = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'apellido': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
      'rut': new FormControl("", Validators.required),
      'mail': new FormControl("", Validators.required),
      'confirmacionPassword': new FormControl("", Validators.required),
      'celular': new FormControl("", Validators.required),
      'direccion': new FormControl("", Validators.required),

    })
      
    



  }

  ngOnInit() {
  }

  async guardar(){
    var f = this.formularioRegistro.value;
    if(this.formularioRegistro.invalid){
      const alert = await this.AlertController.create({
        header: 'Datos incompletos',
        message: 'Por favor llenar todos los campos',
        buttons: ['Aceptar']
      });

      await alert.present();
      return;
    }
  }


}
