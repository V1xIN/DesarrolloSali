import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
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
  constructor() {}
}
