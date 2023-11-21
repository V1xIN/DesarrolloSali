// viaje.service.ts
export class Viaje {
  idViaje = '';
  fechaViaje = '';
  horaViaje = '';
  asientos = '';
  costo = '';
  idAuto_FK = '';
  idSede_FK = '';
  idcomuna_FK = '';

  // Propiedades utilizadas en InfoviajePage
  horasalida = '';
  fecha = '';
  horaRegistro = '';
  desde = '';
  hacia = '';
  marca = '';
  img = '';

  // Nuevas propiedades para corregir los errores en InfoviajePage
  conductor = ''; // Agrega esta propiedad
  imgConductor = ''; // Agrega esta propiedad
  asientosDisponibles = 0; // Agrega esta propiedad
  monto = 0; // Agrega esta propiedad
  patente = ''; // Agrega esta propiedad
}
