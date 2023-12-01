import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BDService } from 'src/app/services/bd.service';

@Component({
  selector: 'app-addauto',
  templateUrl: './addauto.page.html',
  styleUrls: ['./addauto.page.scss'],
})
export class AddautoPage implements OnInit {
  marca: any;
  modelo: any;
  patente: any;
  color: any;
  rutuser: any;
  useractual:any;
  constructor(
    private alertController: AlertController,
    private router: Router,
    private bd: BDService
  ) {}

  ngOnInit() {
    this.bd.fetchUsuario().subscribe(data=>{
      this.useractual = data;
    });
  }
  insertarAuto(){
    this.bd.insertarAuto(this.patente,this.color,this.marca, this.modelo, this.rutuser);
  }
}
