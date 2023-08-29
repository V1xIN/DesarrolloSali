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
    { title: 'Registro', url: '/register', icon: 'exit' },
    { title: 'Agregar auto', url: '/addauto', icon: 'exit' },
    { title: 'Agregar viaje', url: '/addviaje', icon: 'exit' },
    { title: 'Iniciar Sesión', url: '/login', icon: 'exit' },
    { title: 'Cerrar Sesión', url: '/folder/trash', icon: 'exit' },
  ];
  constructor() {}
}
