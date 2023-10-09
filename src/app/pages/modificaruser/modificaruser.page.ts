import { Component, OnInit } from '@angular/core';
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';

@Component({
  selector: 'app-modificaruser',
  templateUrl: './modificaruser.page.html',
  styleUrls: ['./modificaruser.page.scss'],
})
export class ModificaruserPage implements OnInit {

  selectedImage: any;
  image: any;




  constructor() { }
  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
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



  ngOnInit() {
  }

}
