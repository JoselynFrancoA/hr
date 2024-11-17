import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private apiUrl = 'http://localhost:3000/api'; // Cambia según tu configuración
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  setAuthHeader(token: string) {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${token}`);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password }, this.httpOptions);
  }

  getEmpleados(token: string): Observable<any> {
    this.setAuthHeader(token);  // Asegúrate de establecer el token antes de hacer la solicitud
    return this.http.get(`${this.apiUrl}/empleados`, this.httpOptions);
  }

  getEmpleadoById(id: number, token: string): Observable<any> {
    this.setAuthHeader(token);  // Asegúrate de establecer el token antes de hacer la solicitud
    return this.http.get(`${this.apiUrl}/empleados/${id}`, this.httpOptions);
  }

  createEmpleado(data: any, token: string): Observable<any> {
    this.setAuthHeader(token);  // Asegúrate de establecer el token antes de hacer la solicitud
    return this.http.post(`${this.apiUrl}/empleados`, data, this.httpOptions);
  }

  updateEmpleado(id: number, data: any, token: string): Observable<any> {
    this.setAuthHeader(token);  // Asegúrate de establecer el token antes de hacer la solicitud
    return this.http.put(`${this.apiUrl}/empleados/${id}`, data, this.httpOptions);
  }

  deleteEmpleado(id: number, token: string): Observable<any> {
    this.setAuthHeader(token);  // Asegúrate de establecer el token antes de hacer la solicitud
    return this.http.delete(`${this.apiUrl}/empleados/${id}`, this.httpOptions);
  }
}
