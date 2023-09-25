import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BDService {

  public database!: SQLiteObject;
  tablaNoticia: string = "CREATE TABLE IF NOT EXISTS noticia ( id INTEGER PRIMARY KEY autoincrement, titulo VARCHAR(100) NOT NULL,texto VARCHAR(300) NOT NULL);";
  registroNoticia: string = "INSERT OR IGNORE INTRO NOTICIA(id, titulo,texto) VALUES ( 1,  'Soy un título', 'Soy un texto largo de la noticia'); ";
  listaNoticias = new BehaviorSubject([]);
  private isDBREADY: BehaviorSubject<boolean> = new BehaviorSubject
  (false);

  
  constructor(private alertController: AlertController, public sqlite: SQLite, private platform: Platform) {

    this.crearBD();

  }



  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Important message',
      message: 'This is an alert!',
      buttons: ['OK'],
    });

    await alert.present();
  }

  crearBD(){
    // verificar el platform
   this.platform.ready().then(()=>{
   //creamos la BD
   this.sqlite.create({
   name: 'bdnoticias.db',
   location: 'default'
   }).then((db: SQLiteObject)=>{
     //capturar la coneccion a BD
      this.database = db;
   
     // ejecuto la creación de tablas
      this.crearTablas();
   }).catch(e => {
      this.presentAlert("Error en crearBD: " + e);
   
   })
   
   })
   
   
   }


   async crearTablas(){
    try{
    // ejecutar la creación de tablas
    await this.database.executeSql(this.tablaNoticia,[]);
    
    //ejecuto los insert
    await this.database.executeSql(this.registroNoticia,[]);
    
    
    //cambio mi observable de BD
    this.isDBREADY.next(true);
    
    }catch(e){
      this.presentAlert("Error en crearBD: " + e);
    }
    
    }
    
}
