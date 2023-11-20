import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Rol } from './rol.service';
import { Auto } from './auto.service';
import { Comuna } from './comuna.service';
import { Reclamo } from './reclamo.service';
import { Sedes } from './sedes.service';
import { Usuario } from './usuario.service';
import { Viaje } from './viaje.service';
import { Detalle } from './detalle.service';

@Injectable({
  providedIn: 'root',
})
export class BDService {
  public database!: SQLiteObject;

  //TABLAS CREADAS//
  tablaRol: string =
    'CREATE TABLE IF NOT EXISTS rol (idrol INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, nombrerol VARCHAR (30) NOT NULL);';

  tablaComuna: string =
    'CREATE TABLE IF NOT EXISTS comuna (idcomuna INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, nombreComuna VARCHAR(30) NOT NULL);';

  tablaSedes: string =
    'CREATE TABLE IF NOT EXISTS sede (idSede INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, nombreSede VARCHAR(30) NOT NULL);';

  tablaUsuario: string =
    'CREATE TABLE IF NOT EXISTS usuario (rut VARCHAR(12) PRIMARY KEY, nombre VARCHAR(100) NOT NULL, apellido VARCHAR(100) NOT NULL, correo VARCHAR(100) NOT NULL, clave VARCHAR(100) NOT NULL, telefono INTEGER NOT NULL, direccion VARCHAR(50) NOT NULL, idroles_FK INTEGER, foto VARCHAR(255), FOREIGN KEY (idrol_FK) REFERENCES rol(idrol));';
  
  tablaAuto: string =
    'CREATE TABLE IF NOT EXISTS auto (idAuto INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, patente VARCHAR(20) NOT NULL, color VARCHAR(10) NOT NULL, marca VARCHAR(20) NOT NULL, modelo VARCHAR(20) NOT NULL, rut_FK VARCHAR(12), FOREIGN KEY (rut_FK) REFERENCES usuario(rut));';

  tablaViaje: string =
    'CREATE TABLE IF NOT EXISTS viaje (idViaje INTEGER PRIMARY KEY NOT NULL, fechaViaje DATE NOT NULL, horaViaje DATE NOT NULL, asientos INTEGER NOT NULL, costo INTEGER NOT NULL, idAuto_FK INTEGER, idSede_FK INTEGER, idcomuna_FK INTEGER, FOREIGN KEY (idAuto_FK) REFERENCES auto(idAuto), FOREIGN KEY (idSede_FK) REFERENCES sede(idSede), FOREIGN KEY (idcomuna_FK) REFERENCES comuna(idcomuna));';

  tablaReclamo: string =
    'CREATE TABLE IF NOT EXISTS reclamo (idReclamo INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, descripcionReclamo VARCHAR(100) NOT NULL, idViaje_FK INTEGER, FOREIGN KEY (idViaje_FK) REFERENCES viaje(idViaje));';

  tablaDetalle: string =
    'CREATE TABLE IF NOT EXISTS detalleviaje (idDetalle INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, calificacion INTEGER NOT NULL, rut_FK VARCHAR(12), idViaje_FK INTEGER, FOREIGN KEY (rut_FK) REFERENCES usuario(rut), FOREIGN KEY (idViaje_FK) REFERENCES viaje(idViaje));';
  // FIN DE CREACIÓN DE TABLAS //

  // COMIENZO DE LOS INSERT //
  insertRol1: string =
    "INSERT OR IGNORE INTO rol (idrol, nombrerol) VALUES (1, 'Pasajero');";

  insertRol2: string =
    "INSERT OR IGNORE INTO rol (idrol, nombrerol) VALUES (2, 'Conductor');";

  //separador

  insertComuna: string =
    "INSERT OR IGNORE INTO comuna (idComuna, nombreComuna) VALUES (1, 'Huechuraba');";

  insertComuna2: string =
    "INSERT OR IGNORE INTO comuna (idComuna, nombreComuna) VALUES (2, 'Alameda');";

  insertComuna3: string =
    "INSERT OR IGNORE INTO comuna (idComuna, nombreComuna) VALUES (3, 'Santiago Centro');";

  insertComuna4: string =
    "INSERT OR IGNORE INTO comuna (idComuna, nombreComuna) VALUES (4, 'Providencia');";

  insertComuna5: string =
    "INSERT OR IGNORE INTO comuna (idComuna, nombreComuna) VALUES (5, 'Maipú');";

  insertComuna6: string =
    "INSERT OR IGNORE INTO comuna (idComuna, nombreComuna) VALUES (6, 'Cerrillos');";

  insertComuna7: string =
    "INSERT OR IGNORE INTO comuna (idComuna, nombreComuna) VALUES (7, 'Melipilla');";

  insertComuna8: string =
    "INSERT OR IGNORE INTO comuna (idComuna, nombreComuna) VALUES (8, 'La Florida');";

  insertComuna9: string =
    "INSERT OR IGNORE INTO comuna (idComuna, nombreComuna) VALUES (9, 'Puente Alto');";

  insertComuna10: string =
    "INSERT OR IGNORE INTO comuna (idComuna, nombreComuna) VALUES (10, 'San Bernardo');";

  insertComuna11: string =
    "INSERT OR IGNORE INTO comuna (idComuna, nombreComuna) VALUES (11, 'Las Condes');";

  insertComuna12: string =
    "INSERT OR IGNORE INTO comuna (idComuna, nombreComuna) VALUES (12, 'San Joaquín');";

  //separador

  insertSede: string =
    "INSERT OR IGNORE INTO sede (idSede, nombreSede) VALUES (1, 'Sede Plaza Norte');";

  insertSede2: string =
    "INSERT OR IGNORE INTO sede (idSede, nombreSede) VALUES (2, 'Sede Alameda');";

  insertSede3: string =
    "INSERT OR IGNORE INTO sede (idSede, nombreSede) VALUES (3, 'Sede Padre Alonso de Ovalle');";

  insertSede4: string =
    "INSERT OR IGNORE INTO sede (idSede, nombreSede) VALUES (4, 'Sede Antonio Varas');";

  insertSede5: string =
    "INSERT OR IGNORE INTO sede (idSede, nombreSede) VALUES (5, 'Sede Educación Continua');";

  insertSede6: string =
    "INSERT OR IGNORE INTO sede (idSede, nombreSede) VALUES (6, 'Sede Maipú');";

  insertSede7: string =
    "INSERT OR IGNORE INTO sede (idSede, nombreSede) VALUES (7, 'Sede Plaza Oeste');";

  insertSede8: string =
    "INSERT OR IGNORE INTO sede (idSede, nombreSede) VALUES (8, 'Sede Melipilla');";

  insertSede9: string =
    "INSERT OR IGNORE INTO sede (idSede, nombreSede) VALUES (9, 'Sede Plaza Vespucio');";

  insertSede10: string =
    "INSERT OR IGNORE INTO sede (idSede, nombreSede) VALUES (10, 'Sede Puente Alto');";

  insertSede11: string =
    "INSERT OR IGNORE INTO sede (idSede, nombreSede) VALUES (11, 'Sede San Bernardo');";

  insertSede12: string =
    "INSERT OR IGNORE INTO sede (idSede, nombreSede) VALUES (12, 'Sede San Carlos de Apoquindo');";

  insertSede13: string =
    "INSERT OR IGNORE INTO sede (idSede, nombreSede) VALUES (13, 'Sede San Joaquín');";
    //separador









  //Funciones que retornan los observables
  listaRol = new BehaviorSubject([]);
  listaComuna = new BehaviorSubject([]);
  listaSedes = new BehaviorSubject([]);
  listaUsuario = new BehaviorSubject([]);
  listaViaje = new BehaviorSubject([]);
  listaReclamo = new BehaviorSubject([]);
  listaAuto = new BehaviorSubject([]);
  listaDetalle = new BehaviorSubject([]);

  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private alertController: AlertController, public sqlite: SQLite, private platform: Platform) {
    this.crearBD();
  }

  bdState() {
    return this.isDBReady.asObservable();
  }

  fetchRol(): Observable<Rol[]> {
    return this.listaRol.asObservable();
  }

  fetchComuna(): Observable<Comuna[]> {
    return this.listaComuna.asObservable();
  }

  fetchSedes(): Observable<Sedes[]> {
    return this.listaSedes.asObservable();
  }

  fetchUsuario(): Observable<Usuario[]> {
    return this.listaUsuario.asObservable();
  }

  fetchViaje(): Observable<Viaje[]> {
    return this.listaViaje.asObservable();
  }

  fetchReclamo(): Observable<Reclamo[]> {
    return this.listaReclamo.asObservable();
  }
  fetchAuto(): Observable<Auto[]> {
    return this.listaAuto.asObservable();
  }

  fetchDetalle(): Observable<Detalle[]> {
    return this.listaDetalle.asObservable();
  }

  actualizarUsuario(updatedUserData: Usuario): Observable<any> {
  return new Observable((observer) => {
    this.database
      .executeSql(
        'UPDATE usuario SET nombre=?, apellido=?, correo=?, telefono=?, direccion=? WHERE rut=?',
        [
          updatedUserData.nombre,
          updatedUserData.apellido,
          updatedUserData.correo,
          updatedUserData.telefono,
          updatedUserData.direccion,
          // Mantén el rut aquí para usarlo en la cláusula WHERE
          updatedUserData.rut,
        ]
      )
      .then(() => {
        // Obtén y emite los datos actualizados
        this.buscarUsuarioPorRut(updatedUserData.rut).subscribe(
          (usuario) => {
            observer.next(usuario);
          },
          (error) => {
            observer.error(error);
          }
        );
      })
      .catch((error) => {
        observer.error(error);
      })
      .finally(() => {
        observer.complete();
      });
  });
}

actualizarContraseñaNueva(rut: string, nuevaContraseña: string): Promise<void> {
  const sql = 'UPDATE usuario SET clave = ? WHERE rut = ?';
  const values = [nuevaContraseña, rut];

  return this.database.executeSql(sql, values)
    .then(() => {
      // Éxito al actualizar la contraseña
      // Puedes realizar acciones adicionales aquí si es necesario
    })
    .catch((error) => {
      // Manejo de errores
      throw error;
    });
}




buscarViajes() {
  return this.database.executeSql('SELECT * FROM viaje', []).then(res => {
    let items: Viaje[] = [];
    if (res.rows.length > 0) {
      for (var i = 0; i < res.rows.length; i++) {
        items.push({
          idViaje: res.rows.item(i).idViaje,
          fechaViaje: res.rows.item(i).fechaViaje,
          horaViaje: res.rows.item(i).horaViaje,
          asientos: res.rows.item(i).asientos,
          costo: res.rows.item(i).costo,
          idAuto_FK: res.rows.item(i).idAuto_FK,
          idSede_FK: res.rows.item(i).idSede_FK,
          idcomuna_FK: res.rows.item(i).idcomuna_FK,
        });
      }
    }
    this.listaViaje.next(items as any);
  });
}


  buscarAuto() {
    return this.database.executeSql('SELECT * FROM auto', []).then(res => {
      let items: Auto[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            idAuto: res.rows.item(i).idAuto,
            patente: res.rows.item(i).patente,
            color: res.rows.item(i).color,
            modelo: res.rows.item(i).modelo,
            marca: res.rows.item(i).marca,
            rut_FK: res.rows.item(i).rut_FK,
          });
        }
      }
      this.listaAuto.next(items as any); // Cambiado de this.listaViaje a this.listaAuto
    });
  }
  

  buscarComunas() {
    return this.database.executeSql('SELECT * FROM comuna', []).then(res => {
      //variable para almacenar el resultado
      let items: Comuna[] = [];
      //verifico la cantidad de registros
      if (res.rows.length > 0) {
        //agrego registro a registro en mi variable
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            idcomuna: res.rows.item(i).idcomuna,
            nombreComuna: res.rows.item(i).nombreComuna,
          });
        }
      }
      //actualizo el observable
      this.listaComuna.next(items as any);
    });
  }



  buscarSedes() {
    return this.database.executeSql('SELECT * FROM sede', []).then(res => {
      //variable para almacenar el resultado
      let items: Sedes[] = [];
      //verifico la cantidad de registros
      if (res.rows.length > 0) {
        //agrego registro a registro en mi variable
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            idSede: res.rows.item(i).idSede,
            nombreSede: res.rows.item(i).nombreSede,
          });
        }
      }
      //actualizo el observable
      this.listaSedes.next(items as any);
    });
  }

  buscarRol() {
    return this.database.executeSql('SELECT * FROM rol', []).then(res => {
      //variable para almacenar el resultado
      let roles: Rol[] = [];
      //verifico la cantidad de registros
      if (res.rows.length > 0) {
        //agrego registro a registro en mi variable
        for (var i = 0; i < res.rows.length; i++) {
          roles.push({
            idrol: res.rows.item(i).idrol,
            nombrerol: res.rows.item(i).nombrerol,
          });
        }
      }
      //actualizo el observable
      this.listaRol.next(roles as any);
    });
  }

  buscarUsuarioPorRut(rut: string): Observable<Usuario[]> {
    return new Observable((observer) => {
      this.database
        .executeSql('SELECT * FROM usuario WHERE rut = ?', [rut])
        .then((data) => {
          if (data.rows.length > 0) {
            let usuarios: Usuario[] = [];
            for (let i = 0; i < data.rows.length; i++) {
              usuarios.push({
                rut: data.rows.item(i).rut,
                nombre: data.rows.item(i).nombre,
                apellido: data.rows.item(i).apellido,
                correo: data.rows.item(i).correo,
                clave: data.rows.item(i).clave,
                telefono: data.rows.item(i).telefono,
                direccion: data.rows.item(i).direccion,
                idroles_FK: data.rows.item(i).idrol_FK,
              });
            }
            observer.next(usuarios);
          } else {
            observer.next([]);
          }
          observer.complete();
        })
        .catch((error) => {
          this.presentAlert('Error al buscar usuario por rut: ' + error);
          observer.error(error);
          observer.complete();
        });
    });
  } 

  obtenerUsuarioActual(): Observable<Usuario[]> {
    return new Observable((observer) => {
      const rutUsuarioRegistrado = localStorage.getItem('rutUsuarioRegistrado');
  
      if (rutUsuarioRegistrado) {
        this.buscarUsuarioPorRut(rutUsuarioRegistrado).subscribe(
          (usuarios) => {
            // Devuelve el array de usuarios directamente
            observer.next(usuarios);
            observer.complete();
          },
          (error) => {
            // Manejo de errores
            observer.error(error);
            observer.complete();
          }
        );
      } else {
        // No hay rut de usuario registrado en la sesión
        observer.next([]); // Devuelve un array vacío
        observer.complete();
      }
    });
  }
  
  


  cerrarSesion() {
    // Otros procesos de cierre de sesión
    localStorage.removeItem('rutUsuarioRegistrado');
  }
  

  iniciarSesion(email: string, password: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      // Buscar usuario por correo electrónico
      this.database.executeSql('SELECT * FROM usuario WHERE correo = ?', [email])
        .then((data) => {
          if (data.rows.length > 0) {
            const usuario = {
              rut: data.rows.item(0).rut,
              nombre: data.rows.item(0).nombre,
              apellido: data.rows.item(0).apellido,
              correo: data.rows.item(0).correo,
              clave: data.rows.item(0).clave,
              telefono: data.rows.item(0).telefono,
              direccion: data.rows.item(0).direccion,
              idrol_FK: data.rows.item(0).idrol_FK,
            };
  
            // Utiliza una función de comparación de contraseñas adecuada (por ejemplo, bcrypt.compare)
            // Por ahora, compararemos directamente la contraseña para la demostración.
            if (usuario.clave === password) {
              // Contraseña correcta, inicio de sesión exitoso
              // Actualiza localStorage con el nuevo rut
              localStorage.setItem('rutUsuarioRegistrado', usuario.rut);
  
              resolve(true);
            } else {
              // Contraseña incorrecta
              resolve(false);
            }
          } else {
            // Usuario no encontrado
            resolve(false);
          }
        })
        .catch((error) => {
          // Manejo de errores
          reject(error);
        });
    });
  }
  
  insertarViajes(fechaViaje: any, horaViaje: any, asientos: any, costo: any, idAuto_FK: any, idSede_FK: any, idcomuna_FK: any) {
    return this.database
      .executeSql('INSERT INTO viaje(fechaViaje,horaViaje,asientos,costo,idAuto_FK,idSede_FK,idcomuna_FK) VALUES(?,?,?,?,?,?,?)', [fechaViaje, horaViaje, asientos, costo, idAuto_FK, idSede_FK, idcomuna_FK])
      .then(res => {
        // Después de insertar, actualiza la lista de viajes
        this.buscarViajes();
      });
  }
  

  insertarAuto(patente: any, color: any, marca: any, modelo: any, rut_FK: any) {
    return this.database
      .executeSql(
        'INSERT INTO auto (patente, color, marca, modelo, rut_FK) VALUES (?, ?, ?, ?, ?)',
        [patente, color, marca, modelo, rut_FK]
      )
      .then((res) => {
        // Después de insertar, actualiza la lista de autos
        this.buscarAuto();
      })
      .catch((error) => {
        // Manejo de errores
        console.error('Error al insertar auto:', error);
      });
  }

  insertarUsuario(usuario: Usuario): Promise<void> {
    const sql = 'INSERT INTO usuario (rut, nombre, apellido, correo, clave, telefono, direccion, idroles_FK) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [
      usuario.rut,
      usuario.nombre,
      usuario.apellido,
      usuario.correo,
      usuario.clave,
      usuario.telefono,
      usuario.direccion,
      usuario.idroles_FK
    ];

    return this.database.executeSql(sql, values)
      .then(() => {
        // Éxito al insertar el usuario
        // Puedes realizar acciones adicionales aquí si es necesario
      })
      .catch((error) => {
        // Manejo de errores
        throw error;
      });
  }

  async presentAlert(msj: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Important message',
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  crearBD() {
    // verificar el platform
    this.platform.ready().then(() => {
      //creamos la BD
      this.sqlite
        .create({
          name: 'bdsali.db',
          location: 'default',
        })
        .then((db: SQLiteObject) => {
          //capturar la coneccion a BD
          this.database = db;

          // ejecuto la creación de tablas
          this.crearTablas();
        })
        .catch((e) => {
          this.presentAlert('Error en crearBD: ' + e);
        });
    });
  }

  async crearTablas() {
    try {
      // ejecutar la creación de tablas
      await this.database.executeSql(this.tablaRol, []);
      await this.database.executeSql(this.tablaComuna, []);
      await this.database.executeSql(this.tablaSedes, []);
      await this.database.executeSql(this.tablaUsuario, []);
      await this.database.executeSql(this.tablaViaje, []);
      await this.database.executeSql(this.tablaReclamo, []);
      await this.database.executeSql(this.tablaAuto, []);
      await this.database.executeSql(this.tablaDetalle, []);

      //ejecuto los insert
      await this.database.executeSql(this.insertRol1, []);
      await this.database.executeSql(this.insertRol2, []);
      await this.database.executeSql(this.insertComuna, []);
      await this.database.executeSql(this.insertComuna2, []);
      await this.database.executeSql(this.insertComuna3, []);
      await this.database.executeSql(this.insertComuna4, []);
      await this.database.executeSql(this.insertComuna5, []);
      await this.database.executeSql(this.insertComuna6, []);
      await this.database.executeSql(this.insertComuna7, []);
      await this.database.executeSql(this.insertComuna8, []);
      await this.database.executeSql(this.insertComuna9, []);
      await this.database.executeSql(this.insertComuna10, []);
      await this.database.executeSql(this.insertComuna11, []);
      await this.database.executeSql(this.insertComuna12, []);
      await this.database.executeSql(this.insertSede, []);
      await this.database.executeSql(this.insertSede2, []);
      await this.database.executeSql(this.insertSede3, []);
      await this.database.executeSql(this.insertSede4, []);
      await this.database.executeSql(this.insertSede5, []);
      await this.database.executeSql(this.insertSede6, []);
      await this.database.executeSql(this.insertSede7, []);
      await this.database.executeSql(this.insertSede8, []);
      await this.database.executeSql(this.insertSede9, []);
      await this.database.executeSql(this.insertSede10, []);
      await this.database.executeSql(this.insertSede11, []);
      await this.database.executeSql(this.insertSede12, []);
      await this.database.executeSql(this.insertSede13, []);

      //cambio mi observable de BD
      this.isDBReady.next(true);
      this.buscarRol();
      this.buscarSedes();
      this.buscarComunas();
      this.buscarViajes();
      this.buscarAuto();
    } catch (e) {
      this.presentAlert('Error en crearBD: ' + e);
    }
  }
}
