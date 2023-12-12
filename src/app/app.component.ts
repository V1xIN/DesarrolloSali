import { Component, OnInit } from '@angular/core';
import { BDService } from 'src/app/services/bd.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Perfil', url: '/perfil', icon: 'person-circle', visible: false },
    { title: 'Reclamo', url: '/reclamo', icon: 'alert-circle', visible: false },
    { title: 'Cerrar Sesión', url: '/login', icon: 'log-out', visible: false },
  ];

  // Agrega una propiedad para almacenar la información del usuario actual
  usuarioActual: any = {};

  constructor(private bd: BDService) {}

  ngOnInit() {
    // Llama al método para obtener la información del usuario actual al inicializar el componente
    //this.obtenerUsuarioActual();
  }
  /*
  obtenerUsuarioActual() {
    const rutUsuarioRegistrado = localStorage.getItem('rutUsuarioRegistrado');

    if (rutUsuarioRegistrado) {
      // Llama a tu servicio o método para obtener la información del usuario
      this.bd.buscarUsuarioPorRut(rutUsuarioRegistrado).subscribe((usuarios) => {
        if (usuarios.length > 0) {
          // Asigna la información del usuario actual
          this.usuarioActual = usuarios[0];
          // Actualiza la visibilidad de las opciones según si hay un usuario registrado
          this.actualizarVisibilidadOpciones();
        }
      });
    }
  }*/

  cerrarSesion() {
    // Otros procesos de cierre de sesión
    localStorage.removeItem('rutUsuarioRegistrado');
    // También puedes restablecer la información del usuario actual a un objeto vacío
    this.usuarioActual = {};
    // Actualiza la visibilidad de las opciones después de cerrar sesión
    this.actualizarVisibilidadOpciones();
  }

  private actualizarVisibilidadOpciones() {
    // Actualiza la propiedad 'visible' de cada opción según si hay un usuario registrado o no
    this.appPages.forEach((opcion) => {
      if (opcion.title === 'Iniciar Sesión') {
        opcion.visible = !this.usuarioActual || Object.keys(this.usuarioActual).length === 0;
      } else if (opcion.title === 'Cerrar Sesión') {
        opcion.visible = this.usuarioActual && Object.keys(this.usuarioActual).length > 0;
      } else {
        opcion.visible = true; // Opciones que no son de inicio/cierre de sesión siempre visibles
      }
    });
  }
}
