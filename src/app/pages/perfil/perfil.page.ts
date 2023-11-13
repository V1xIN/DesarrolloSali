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
    // Obtener el rut del usuario registrado desde el localStorage
    const rutUsuarioRegistrado = localStorage.getItem('rutUsuarioRegistrado');

    // Verificar si el rut existe en el localStorage
    if (rutUsuarioRegistrado) {
      // Buscar el usuario por el rut obtenido
      this.bdService.buscarUsuarioPorRut(rutUsuarioRegistrado).subscribe((usuario: Usuario[]) => {
        if (usuario && usuario.length > 0) {
          // Actualizar los campos del perfil con la información del usuario
          this.nombre = usuario[0].nombre;
          this.apellido = usuario[0].apellido;
          this.rut = usuario[0].rut;
          this.email = usuario[0].correo;
          this.telefono = usuario[0].telefono.toString();
          this.direccion = usuario[0].direccion;
          this.esConductor = this.isConductor(usuario[0]);
        }
      });
    }
  }

  private isConductor(usuario: Usuario): boolean {
    // Ajusta según la estructura de tus datos
    return usuario.idrol_FK === 'id_del_rol_conductor';
  }
}
