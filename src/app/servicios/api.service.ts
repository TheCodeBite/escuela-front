import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url: String = "http://localhost:8080/api/";

  constructor(
    private http: HttpClient
  ) { }

  crearGrupo(body: any) {
    return this.http.post(this.url + "crear-salon", body);
  }

  getGrupos() {
    return this.http.get( this.url +"obtener-salones");
  }

  asignarAlumnoSalon(body: any) {
    return this.http.post(this.url + "asignarAlumnoSalon", body)
  }

  obtenerAlumnosEnSalon(body:any) {
    return this.http.post(this.url + "obtenerAlumnosActivosPorSalon", body);
  }

  eliminarAlumno(request: any) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: request
    };
    
    return this.http.delete(this.url + "eliminar-alumno", options);
  }

  actualizarAlumno(body:any) {
    return this.http.put(this.url + "actualizar-alumno", body)
  }
}
