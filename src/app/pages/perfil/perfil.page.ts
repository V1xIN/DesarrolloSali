import { Component, OnInit } from '@angular/core';
import { BDService } from 'src/app/services/bd.service';
import { Usuario } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  nombre: string = '';
  apellido: string = '';
  rut: string = '';
  email: string = '';
  telefono: string = '';
  direccion: string = '';
  esConductor: boolean = false;

  constructor(private bdService: BDService) {}

  ngOnInit() {
    const rutUsuarioRegistrado = localStorage.getItem('rutUsuarioRegistrado');
  
    if (rutUsuarioRegistrado) {
      this.bdService.buscarUsuarioPorRut(rutUsuarioRegistrado).subscribe(
        (usuario: Usuario[]) => {
          if (usuario && usuario.length > 0) {
            this.nombre = usuario[0].nombre;
            this.apellido = usuario[0].apellido;
            this.rut = usuario[0].rut;
            this.email = usuario[0].correo;
            this.telefono = usuario[0].telefono.toString();
            this.direccion = usuario[0].direccion;
            this.esConductor = this.isConductor(usuario[0]);
          }
        }
      );
  
      // Suscríbete a listaUsuario para recibir actualizaciones
      this.bdService.fetchUsuario().subscribe(
        (usuarios: Usuario[]) => {
          const usuarioActualizado = usuarios.find((u) => u.rut === rutUsuarioRegistrado);
          if (usuarioActualizado) {
            this.nombre = usuarioActualizado.nombre;
            this.apellido = usuarioActualizado.apellido;
            this.email = usuarioActualizado.correo;
            this.telefono = usuarioActualizado.telefono.toString();
            this.direccion = usuarioActualizado.direccion;
            this.esConductor = this.isConductor(usuarioActualizado);
          }
        }
      );
    }
  }
  

  private isConductor(usuario: Usuario): boolean {
    // Ajusta según la estructura de tus datos
    return usuario.idrol_FK === 'conductor';
  }
}
