import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modificaruser',
  templateUrl: './modificaruser.page.html',
  styleUrls: ['./modificaruser.page.scss'],
})
export class ModificaruserPage implements OnInit {

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



  constructor() { }

  ngOnInit() {
  }

}
