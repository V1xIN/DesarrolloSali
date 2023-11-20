import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SmsService {
  private apiEndpoint = 'https://vv96me.api.infobip.com/sms/2/text/advanced'; // Reemplaza con tu propia URL de la API
  private apiKey = '0e83607ba05aa89a2a6268554ed11edb-2c1fde32-c848-4147-a0d5-884cfa133dcd'; // Reemplaza con tu propia clave API

  constructor(private http: HttpClient) { }

  sendSms(phoneNumber: string, code: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.apiKey
    });

    const payload = {
      messages: [
        {
          from: 'Viajes Salí',
          destinations: [
            {
              to: phoneNumber
            }
          ],
          text: `Tu código de recuperación de contraseña es: ${code}`
        }
      ]
    };

    return this.http.post(this.apiEndpoint, payload, { headers });
  }
}
