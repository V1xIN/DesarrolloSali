import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Usuario } from './usuario';
import { Router } from '@angular/router';
import { Auto } from './auto';
import { Rol } from './rol';
import { Comuna } from './comuna';
import { Sedes } from './sedes';
import { Viaje } from './viaje';
import { Reclamo } from './reclamo';
import { Detalle } from './detalle';

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
    'CREATE TABLE IF NOT EXISTS usuario (rut VARCHAR(12) PRIMARY KEY, nombre VARCHAR(100) NOT NULL, apellido VARCHAR(100) NOT NULL, correo VARCHAR(100) NOT NULL, clave VARCHAR(100) NOT NULL, telefono INTEGER NOT NULL, direccion VARCHAR(50) NOT NULL, idroles_FK INTEGER, foto VARCHAR(255), FOREIGN KEY (idroles_FK) REFERENCES rol(idrol));';
  
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

  constructor(private alertController: AlertController, public sqlite: SQLite, private platform: Platform, private router: Router) {
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


// Cambia el tipo de retorno de la función buscarAutoPorRut
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
  buscarAuto() {
    return this.database.executeSql('SELECT * FROM auto', []).then(res => {
      //variable para almacenar el resultado
      let autos: Auto[] = [];
      //verifico la cantidad de registros
      if (res.rows.length > 0) {
        //agrego registro a registro en mi variable
        for (var i = 0; i < res.rows.length; i++) {
          autos.push({
            idAuto: res.rows.item(i).idAuto,
            patente: res.rows.item(i).patente,
            color: res.rows.item(i).color,
            marca: res.rows.item(i).marca,
            modelo: res.rows.item(i).modelo,
            rut_FK: res.rows.item(i).rut_FK,
          });
        }
      }
      //actualizo el observable
      this.listaAuto.next(autos as any);
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
        this.presentAlert("Viaje Registrado Correctamente");
        // Después de insertar, actualiza la lista de viajes
        this.buscarViajes();
      }).catch(e=>{
        this.presentAlert('Error en crear Viaje: ' + JSON.stringify(e));
      });
  }
  
  insertarAuto(patente: any, color: any, marca: any, modelo: any, rut_FK: any) {
    return this.database
      .executeSql('INSERT INTO auto(patente,color,marca,modelo,rut_FK) VALUES(?,?,?,?,?)', [patente, color, marca, modelo, rut_FK])
      .then(res => {
        // Después de insertar, actualiza la lista de viajes
        this.presentAlert("Auto Registrado Correctamente");
        this.router.navigate(['/perfil']);
        this.buscarAuto();
      }).catch(e=>{
        this.presentAlert('Error en crear Auto: ' + JSON.stringify(e));
      });
  }
  
  // Funciones correctas
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
      this.presentAlert('Error en crearBD: ' + JSON.stringify(e));
    }
  }

  //Nuevas funciones
  //Registro

  InsertUser(rut: any, nombre: any, apellido: any, correo: any, clave: any, telefono: any, direccion: any, idroles_FK: any) {
    return this.database
      .executeSql('INSERT INTO usuario(rut,nombre,apellido,correo,clave,telefono,direccion,idroles_FK) VALUES(?,?,?,?,?,?,?,?)', [rut, nombre, apellido, correo, clave, telefono, direccion,idroles_FK]).then(res=>{
        this.presentAlert("Usuario Registrado Correctamente");
        this.router.navigate(['/login']);
      }).catch(e=>{
        this.presentAlert('Error en crear Usuario: ' + JSON.stringify(e));
      })
  }

  //inicio sesion
  LoginUser(correo:any, clave:any){
    return this.database.executeSql("SELECT * FROM usuario WHERE correo = ? and clave = ?", [correo,clave]).then(res=>{
      if(res.rows.length > 0){
        this.presentAlert("Bienvenido al Sistema");
        this.ObternerUserLogin(correo,clave);
        this.router.navigate(['/pprincipal']);
      }
      else{
        this.presentAlert("Usuario o Contraseña incorrecta");
      }
    }).catch(e=>{
      this.presentAlert('Error en sentencia login: ' + JSON.stringify(e));
    })
  }
  //observable para obtener el usuario logueado
  ObternerUserLogin(correo:any,clave:any){
    //this.presentAlert("1");
    return this.database.executeSql("SELECT * FROM usuario WHERE correo = ? and clave = ?", [correo,clave]).then(res=>{
      if(res.rows.length > 0){
        //this.presentAlert("2");
        let items: Usuario[] = [];
        for (let i = 0; i < res.rows.length; i++) {
          //this.presentAlert("3");
          items.push({
            rut: res.rows.item(i).rut,
            nombre: res.rows.item(i).nombre,
            apellido: res.rows.item(i).apellido,
            correo: res.rows.item(i).correo,
            clave: res.rows.item(i).clave,
            telefono: res.rows.item(i).telefono,
            direccion: res.rows.item(i).direccion,
            idroles_FK: res.rows.item(i).idroles_FK,
          });
        }
        //llamar a buscar autos del conductor
        
        this.listaUsuario.next(items as any);
        this.SearchCar(items[0].rut);
        //this.presentAlert("Actualizo el observable");
      }
    }).catch(e=>{
      this.presentAlert('Error en sentencia select user: ' + JSON.stringify(e));
    })
  }


  //funciuon buscar autos
  SearchCar(rut:any){
    return this.database.executeSql("SELECT * FROM auto WHERE rut_FK = ?", [rut]).then(res2=>{
      if(res2.rows.length > 0){
        let items2: Auto[] = [];
        for (let i = 0; i < res2.rows.length; i++) {
          //this.presentAlert("3");
          items2.push({
            idAuto: res2.rows.item(i).idAuto,
            patente: res2.rows.item(i).patente,
            color: res2.rows.item(i).color,
            marca: res2.rows.item(i).marca,
            modelo: res2.rows.item(i).modelo,
            rut_FK: res2.rows.item(i).rut_FK

          });
        }
        this.listaAuto.next(items2 as any);

      }
    }).catch(e=>{
      this.presentAlert('Error en sentencia select car: ' + JSON.stringify(e));
    })
  }

}
