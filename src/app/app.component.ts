import { Component, OnInit } from '@angular/core';
import { BDService } from 'src/app/services/bd.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Perfil', url: '/perfil', icon: 'person-circle' },
    { title: 'Editar Perfil', url: '/modificaruser', icon: 'build' },
    { title: 'Reclamo', url: '/reclamo', icon: 'alert-circle' },
    { title: 'Registro', url: '/register', icon: 'finger-print' },
    { title: 'Agregar auto', url: '/addauto', icon: 'car-sport' },
    { title: 'Agregar viaje', url: '/addviaje', icon: 'trail-sign' },
    { title: 'Iniciar Sesión', url: '/login', icon: 'log-in' },
    { title: 'Cerrar Sesión', url: '/login', icon: 'log-out' },
  ];

  // Agrega una propiedad para almacenar la información del usuario actual
  usuarioActual: any = {};

  constructor(private bd: BDService) {}

  ngOnInit() {
    // Llama al método para obtener la información del usuario actual al inicializar el componente
    this.obtenerUsuarioActual();
  }

  obtenerUsuarioActual() {
    const rutUsuarioRegistrado = localStorage.getItem('rutUsuarioRegistrado');

    if (rutUsuarioRegistrado) {
      // Llama a tu servicio o método para obtener la información del usuario
      this.bd.buscarUsuarioPorRut(rutUsuarioRegistrado).subscribe((usuarios) => {
        if (usuarios.length > 0) {
          // Asigna la información del usuario actual
          this.usuarioActual = usuarios[0];
        }
      });
    }
  }

  cerrarSesion() {
    // Otros procesos de cierre de sesión
    localStorage.removeItem('rutUsuarioRegistrado');
    // También puedes restablecer la información del usuario actual a un objeto vacío
    this.usuarioActual = {};
  }
}
