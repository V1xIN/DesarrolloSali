// perfil.page.ts

import { Component, OnInit } from '@angular/core';
import { BDService } from 'src/app/services/bd.service';
import { Usuario } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  nombre: string = ''; // Asignar un valor inicial vacío
  apellido: string = '';
  rut: string = '';
  email: string = '';
  telefono: string = '';
  direccion: string = '';

  constructor(private bdService: BDService) {}

  ngOnInit() {
    // Cambia 'el-rut-del-usuario-registrado' con el rut del usuario actual
    const rutUsuarioRegistrado = 'el-rut-del-usuario-registrado';

    // Llama a tu servicio para obtener los datos del usuario
    this.bdService.buscarUsuarioPorRut(rutUsuarioRegistrado).subscribe((usuario: Usuario[]) => {
      if (usuario && usuario.length > 0) {
        // Asigna los datos del usuario a las variables del componente
        this.nombre = usuario[0].nombre;
        this.apellido = usuario[0].apellido;
        this.rut = usuario[0].rut;
        this.email = usuario[0].correo;
        this.telefono = usuario[0].telefono.toString(); // Convierte el número a cadena si es necesario
        this.direccion = usuario[0].direccion;
      }
    });
  }
}
