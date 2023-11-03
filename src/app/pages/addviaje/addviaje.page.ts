import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addviaje',
  templateUrl: './addviaje.page.html',
  styleUrls: ['./addviaje.page.scss'],
})
export class AddviajePage implements OnInit {

  sedes: any;
  comunas: any;
  fechaViaje: any;
  horaViaje: any;
  asientos: any;
  costo

  constructor() { }

  ngOnInit() {
  }

}
