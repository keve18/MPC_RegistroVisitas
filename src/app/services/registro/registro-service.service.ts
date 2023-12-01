import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';


import { environment } from '../../../../environments/environments';
import { IReniec } from 'src/app/interface/reniec.interface';
import { IHoraSalida, IRegistro } from 'src/app/interface/registro.interface';

const base_url = environment.base_url;
const urlReniec = environment.base_url_reniec;
const token = environment.token;

@Injectable({
  providedIn: 'root'
})
export class RegistroServiceService {

  constructor(private http: HttpClient) {}

  cargarRegistros(): Observable<IRegistro[]> {
    const url = `${base_url}/registro`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.get<IRegistro[]>(url,httpOptions);
  }
  
  consultarDNI(dni: String): Observable<IReniec> {
    const url = `${urlReniec}dni/${dni}?token=${token}`;
    return this.http.get<IReniec>(url).pipe(
      map((data: any) => {
        // Aquí puedes realizar cualquier transformación necesaria en la respuesta antes de devolverla al componente.
        return data as IReniec;
      })
    );
  }
  
  insertRegistro(registro: IRegistro): Observable<IRegistro> {
    const url = `${base_url}/registro`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<IRegistro>(url, registro,httpOptions).pipe(
        catchError((error) => {
            console.error('Error en la solicitud HTTP:', error);
            throw error;
        })
    );
}

actualizarSalida(codigo: Number, data: IHoraSalida): Observable<IHoraSalida> {
  const url = `${base_url}/registro/${codigo}`;
  console.log('item:', codigo);
  console.log('hra que pasa por el servicio:', data);
  return this.http.put<IHoraSalida>(url, data);
}
}
