import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Component } from '@angular/core';
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
    'CREATE TABLE IF NOT EXISTS rol (idrol INTEGER PRIMARY KEY autoincrement NOT NULL, nombrerol VARCHAR (30) NOT NULL);';

  tablaComuna: string =
    'CREATE TABLE IF NOT EXISTS comuna (idcomuna INTEGER PRIMARY KEY autoincrement NOT NULL, nombreComuna VARCHAR(30)NOT NULL);';

  tablaSedes: string =
    'CREATE TABLE IF NOT EXISTS sede (idSede INTEGER PRIMARY KEY autoincrement NOT NULL, nombreSede VARCHAR(30)NOT NULL);';

  tablaUsuario: string =
    'CREATE TABLE IF NOT EXISTS usuario ( rut VARCHAR(12) PRIMARY KEY , nombre VARCHAR(100) NOT NULL,apellido VARCHAR(100) NOT NULL, correo VARCHAR(100) NOT NULL, clave VARCHAR(100) NOT NULL, telefono INTEGER(9) NOT NULL, direccion VARCHAR(50) NOT NULL,idrol_FK INTEGER, FOREING KEY (idrol_FK) REFERENCES rol(idrol) );';

  tablaAuto: string =
    'CREATE TABLE IF NOT EXISTS auto (idAuto INTEGER PRIMARY KEY autoincrement NOT NULL,patente VARCHAR(20) NOT NULL, color VARCHAR(10) NOT NULL, marca VARCHAR(20) NOT NULL, modelo VARCHAR(20) NOT NULL, numeroChasis VARCHAR(100) NOT NULL,rut_FK VARCHAR(12),FOREING KEY (rut_FK) REFERENCES usuario(rut)) ;';
  
  tablaViaje: string =
    'CREATE TABLE IF NOT EXISTS viaje (idViaje INTEGER PRIMARY KEY NOT NULL , fechaViaje DATE NOT NULL, horaViaje DATE NOT NULL, asientos NUMBER(2) NOT NULL, costo INTEGER NOT NULL,idAuto_FK INTEGER, FOREING KEY (idAuto_FK) REFERENCES auto(idAuto), idSede_FK INTEGER, FOREING KEY (idSede_FK) REFERENCES sede(idSede), idcomuna_FK INTEGER, FOREING KEY (idcomuna_FK) REFERENCES comuna(idcomuna));';  // TABLA CON FK INCOMPLETA
  
  tablaReclamo: string =
    'CREATE TABLE IF NOT EXISTS reclamo (idReclamo INTEGER PRIMARY KEY autoincrement NOT NULL, descripcionReclamo VARCHAR(100) NOT NULL,idViaje_FK INTEGER,FOREING KEY (idViaje_FK) REFERENCES viaje(idViaje));';

  tablaDetalle: string =
    'CREATE TABLE IF NOT EXISTS detalleviaje (idDetalle INTEGER PRIMARY KEY autoincrement NOT NULL, calificacion INTEGER NOT NULL,rut_FK VARCHAR(12),FOREING KEY (rut_FK) REFERENCES usuario(rut),idViaje_FK INTEGER,FOREING KEY (idViaje_FK) REFERENCES viaje(idViaje));';
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

  constructor(
    private alertController: AlertController,
    public sqlite: SQLite,
    private platform: Platform
  ) {
    this.crearBD();
  }

  bdState(){
    return this.isDBReady.asObservable();
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

  fetchViaje(): Observable<Viaje[]>{
    return this.listaViaje.asObservable();
  }

  fetchReclamo(): Observable<Reclamo[]>{
    return this.listaReclamo.asObservable();
  }
  fetchAuto(): Observable<Auto[]>{
    return this.listaAuto.asObservable();
  }

  fetchDetalle(): Observable<Detalle[]>{
    return this.listaDetalle.asObservable();
  }
//Fin Funciones que retornan los observables
//Funcion para buscar datos en las tabla sede
buscarSedes(){
  return this.database.executeSql('SELECT * FROM sede',[]).then(res=>{
    //variable para almacenar el resultado
    let items: Sedes[] = [];
    //verfico la cantidad de registros
    if(res.rows.length > 0){
      //agrego registro a registro en mi variable
      for(var i=0; i < res.rows.length; i++){
        items.push({
          idSede: res.rows.item(i).idSede,
          nombreSede: res.rows.item(i).nombreSede
        })
      }
    }
    //actualizo el observable
    this.listaSedes.next(items as any);
  })
}
//Fin funcion que busca datos en la tabla rol
buscarRol(){
  return this.database.executeSql('SELECT * FROM rol',[]).then(res=>{
    //variable para almacenar el resultado
    let roles: Rol[] = [];
    //verfico la cantidad de registros
    if(res.rows.length > 0){
      //agrego registro a registro en mi variable
      for(var i=0; i < res.rows.length; i++){
        roles.push({
          idrol: res.rows.item(i).idrol,
          nombrerol: res.rows.item(i).nombrerol
        })
      }
    }
    //actualizo el observable
    this.listaRol.next(roles as any);
  })
}
//Fin funcion que busca datos en la tabla rol














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
      this.sqlite.create({
          name: 'bdsali.db',
          location: 'default',
        }).then((db: SQLiteObject) => {
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
      await this.database.executeSql(this.tablaReclamo, []);
      await this.database.executeSql(this.tablaAuto, []);
      await this.database.executeSql(this.tablaDetalle, [])

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
      this.isDBReady.next(true);
      this.buscarRol();
    } catch (e) {
      this.presentAlert('Error en crearBD: ' + e);
    }
  }
}
