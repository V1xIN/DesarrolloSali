import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BDService } from 'src/app/services/bd.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario: any;
  autos: any;
  constructor(private bdService: BDService, private router: Router) {}

  ngOnInit() {
    this.bdService.fetchUsuario().subscribe(data=>{
      this.usuario = data;
    });
    this.bdService.fetchAuto().subscribe(data2=>{
      this.autos = data2;
    })
  }
  
  modificar(usuario:any){
    let navigationExtras : NavigationExtras = {
      state: {
        rutenviado: usuario.rut,
        nombreenviado: usuario.nombre,
        apellidoenviado: usuario.apellido,
        correoenviado: usuario.correo,
        telefonoenviado: usuario.telefono,
        direccionenviado: usuario.direccion
      }
    }
    this.router.navigate(['/modificaruser'], navigationExtras);

  }

  /*
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
            
            if (this.esConductor) {
              // Si es conductor, busca y muestra los autos
              this.bdService.buscarAutoPorRut(this.rut).subscribe(
                (autos: Auto[]) => {
                  this.autos = autos;
                },
                (error) => {
                  console.error('Error al buscar autos por rut:', error);
                }
              );
            }
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
            
            if (this.esConductor) {
              // Si es conductor, busca y muestra los autos
              this.bdService.buscarAutoPorRut(this.rut).subscribe(
                (autos: Auto[]) => {
                  this.autos = autos;
                },
                (error) => {
                  console.error('Error al buscar autos por rut:', error);
                }
              );
            }
          }
        }
      );
    }
  }

  private isConductor(usuario: Usuario): boolean {
    // Ajusta según la estructura de tus datos
    return usuario.idroles_FK.includes('2'); // Considerando que el idrol_FK para conductor es 2
  }

  */
}
