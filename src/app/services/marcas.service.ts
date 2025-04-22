import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcasService {

  private apiUrl = 'http://localhost:3000/api/marcas'; // Actualiza con tu API real

  constructor(private http: HttpClient) { }

  getMarcas(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getMarca(id:any): Observable<any> {
    return this.http.get(this.apiUrl+'/'+id);
  }

  updateMarca(id: number, marcaData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, marcaData);
  }

  addMarca(marcaData: any): Observable<any> {
    return this.http.post(this.apiUrl+'/addMarca', marcaData);
  }
}
