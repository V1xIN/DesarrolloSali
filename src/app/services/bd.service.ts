import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Rol } from './rol.service';
import { Auto } from './auto.service';
import { Calificacion } from './calificacion.service';
import { Comuna } from './comuna.service';
import { Reclamo } from './reclamo.service';
import { Sedes } from './sedes.service';
import { Usuario } from './usuario.service';
import { Viaje } from './viaje.service';

@Injectable({
  providedIn: 'root',
})
export class BDService {
  public database!: SQLiteObject;


  //TABLAS CREADAS//  
  tablaRol: string =
    'CREATE TABLE IF NOT EXISTS rol (idrol INTEGER PRIMARY KEY autoincrement NOT NULL, nombrerol VARCHAR (30) NOT NULL);';

  tablaComuna: string =
    'CREATE TABLE IF NOT EXISTS comuna (idcomuna INTEGER PRIMARY KEY autoincrement NOT NULL, nombreComuna VARCHAR(30)NOT NULL);';

  tablaSedes: string =
    'CREATE TABLE IF NOT EXISTS sede (idSede INTEGER PRIMARY KEY autoincrement NOT NULL, nombreSede VARCHAR(30)NOT NULL);';


  tablaUsuario: string =
    'CREATE TABLE IF NOT EXISTS usuario ( rut VARCHAR(12) PRIMARY KEY , nombre VARCHAR(100) NOT NULL,apellido VARCHAR(100) NOT NULL, correo VARCHAR(100) NOT NULL, clave VARCHAR(100) NOT NULL, telefono INTEGER(9) NOT NULL, direccion VARCHAR(50) NOT NULL,idrol_FK INTEGER, FOREING KEY (idrol_FK) REFERENCES rol(idrol) );'; // TABLA CON FK INCOMPLETA

  tablaViaje: string =
    'CREATE TABLE IF NOT EXISTS viaje (idViaje INTEGER PRIMARY KEY NOT NULL , fechaViaje DATE NOT NULL, horaViaje DATE NOT NULL, asientos NUMBER(2) NOT NULL, idSede_FK INTEGER, FOREING KEY (idSede_FK) REFERENCES sede(idSede), idcomuna_FK INTEGER, FOREING KEY (idcomuna_FK) REFERENCES comuna(idcomuna), descipcion VARCHAR(50) NOT NULL, idCalificacion_FK INTEGER, FOREING KEY (idCalificacion_FK) REFERENCES calificacion(idCalificacion) );';  // TABLA CON FK INCOMPLETA

  tablaCalificacion: string =
    'CREATE TABLE IF NOT EXISTS calificacion (idCalificacion INTEGER PRIMARY KEY autoincrement NOT NULL, comentarioCalificacion VARCHAR(100), calificacion INTEGER(1) NOT NULL );';

  tablaReclamo: string =
    'CREATE TABLE IF NOT EXISTS reclamo (idReclamo INTEGER PRIMARY KEY autoincrement NOT NULL, descripcionReclamo VARCHAR(100) NOT NULL);';

  tablaAuto: string =
    'CREATE TABLE IF NOT EXISTS auto (patente INTEGER PRIMARY KEY autoincrement NOT NULL, color VARCHAR(10) NOT NULL, marca VARCHAR(20) NOT NULL, modelo VARCHAR(20) NOT NULL,  numeroMotor VARCHAR(100) NOT NULL, numeroChasis VARCHAR(100) NOT NULL,rut_FK VARCHAR(12),FOREING KEY (rut_FK) REFERENCES usuario(rut)) ;';  // TABLA CON FK INCOMPLETA

  // FIN DE CREACIÓN DE TABLAS //


  // COMIENZO DE LOS INSERT //

  insertRol1: string =
    "INSERT OR IGNORE INTO rol (idrol, nombrerol) VALUES (1, 'Pasajero');";

  insertRol2: string =
    "INSERT OR IGNORE INTO rol (idrol, nombrerol) VALUES (2, 'Conductor');";

  insertComuna: string =
    "INSERT OF IGNORE INTO comuna (idComuna, nombreComuna) VALUES (1, 'Huechuraba');";

  insertComuna2: string =
    "INSERT OF IGNORE INTO comuna (idComuna, nombreComuna) VALUES (2, 'Quilicura');";

  insertComuna3: string =
    "INSERT OF IGNORE INTO comuna (idComuna, nombreComuna) VALUES (3, 'Independencia');";

  insertComuna4: string =
    "INSERT OF IGNORE INTO comuna (idComuna, nombreComuna) VALUES (4, 'Recoleta');";

  insertComuna5: string =
    "INSERT OF IGNORE INTO comuna (idComuna, nombreComuna) VALUES (5, 'Conchalí');";


  insertSede: string =
    "INSERT OR IGNORE INTO sede (idSede, nombreSede) VALUES (1, 'Plaza Norte');";


  insertSede2: string =
    "INSERT OR IGNORE INTO sede (idSede, nombreSede) VALUES (2, 'Alameda');";

  //FIN DE LOS INSERT//

  //Funciones que retornan los observables
  listaRol = new BehaviorSubject([]);
  listaComuna = new BehaviorSubject([]);
  listaSedes = new BehaviorSubject([]);
  listaUsuario = new BehaviorSubject([]);
  listaViaje = new BehaviorSubject([]);
  listaCalificacion = new BehaviorSubject([]);
  listaReclamo = new BehaviorSubject([]);
  listaAuto = new BehaviorSubject([]);

  private isDBREADY: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private alertController: AlertController,
    public sqlite: SQLite,
    private platform: Platform
  ) {
    this.crearBD();
  }

  bdState(){
    return this.isDBREADY.asObservable();
  }

  fetchRol(): Observable<Rol[]>{
    return this.listaRol.asObservable();
  }

  fetchComuna(): Observable<Comuna[]>{
    return this.listaComuna.asObservable();
  }

  fetchSedes(): Observable<Sedes[]>{
    return this.listaComuna.asObservable();
  }

  fetchUsuario(): Observable<Usuario[]>{
    return this.listaUsuario.asObservable();
  }

  fetchCalificacion(): Observable<Calificacion[]>{
    return this.listaCalificacion.asObservable();
  }

  fetchViaje(): Observable<Viaje[]>{
    return this.listaViaje.asObservable();
  }

  fetchReclamo(): Observable<Reclamo[]>{
    return this.listaReclamo.asObservable();
  }
  fetchAuto(): Observable<Auto[]>{
    return this.listaAuto.asObservable();
  }

//Fin Funciones que retornan los observables
  async presentAlert(msj:String) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Important message',
      message: 'This is an alert!',
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
        }).catch(e =>{
          this.presentAlert("Error en crearBD: " + e);
        })
    })
  }

  async crearTablas() {
    try {
      // ejecutar la creación de tablas
      await this.database.executeSql(this.tablaRol, []);
      await this.database.executeSql(this.tablaComuna, []);
      await this.database.executeSql(this.tablaSedes, []);
      await this.database.executeSql(this.tablaUsuario, []);
      await this.database.executeSql(this.tablaViaje, []);
      await this.database.executeSql(this.tablaCalificacion, []);
      await this.database.executeSql(this.tablaReclamo, []);
      await this.database.executeSql(this.tablaAuto, []);

      //ejecuto los insert
      await this.database.executeSql(this.insertRol1, []);
      await this.database.executeSql(this.insertRol2, []);
      await this.database.executeSql(this.insertComuna, []);
      await this.database.executeSql(this.insertComuna2, []);
      await this.database.executeSql(this.insertComuna3, []);
      await this.database.executeSql(this.insertComuna4, []);
      await this.database.executeSql(this.insertComuna5, []);
      await this.database.executeSql(this.insertSede, []);
      await this.database.executeSql(this.insertSede2, []);

      //cambio mi observable de BD
      this.isDBREADY.next(true);
    } catch (e) {
      this.presentAlert('Error en crearBD: ' + e);
    }
  }
}
