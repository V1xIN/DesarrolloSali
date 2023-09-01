import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pprincipal',
  templateUrl: './pprincipal.page.html',
  styleUrls: ['./pprincipal.page.scss'],
})
export class PprincipalPage implements OnInit {
  viajes: any=[
    {
      horasalida:'12:50',
      desde:'Plaza Norte',
      hacia:'Quilicura',
      marca:'Mitsubishi Lancer rojo',
      img:'https://arc-anglerfish-arc2-prod-copesa.s3.amazonaws.com/public/RP5XD5W7ERASLG5HD3LOVOXUQM.jpg'
    },
    {
      horasalida:'13:15',
      desde:'Plaza Norte',
      hacia:'Costanera Center',
      marca:'Toyota Yaris gris',
      img:'https://tcl-s3-bucket.s3.amazonaws.com/media/images/YarisI2.max-730x330.png'
    },
    {
      horasalida:'14:10',
      desde:'Plaza Norte',
      hacia:'Costanera Center',
      marca:'Susuki Swift azul',
      img:'https://upload.wikimedia.org/wikipedia/commons/9/9a/2018_Suzuki_Swift_SZ5_Boosterjet_SHVS_1.0_Front.jpg'
    }
  ];

  


  constructor() { }

  ngOnInit() {
  }

}
