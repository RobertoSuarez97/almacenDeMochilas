import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private apiUrl = 'http://localhost:3000/api/categorias'; // Actualiza con tu API real

  constructor(private http: HttpClient) { }

  getCategorias(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addProductoCategorias(id: any, array: any): Observable<any> {
    return this.http.post(this.apiUrl+'/addDetalleCategoria/'+id, array);
  }

  getProductoCategorias(id: any): Observable<any> {
    return this.http.get(this.apiUrl+'/getDetalleCategoria/'+id);
  }

  deleteProductoCategorias(id: any): Observable<any> {
    return this.http.delete(this.apiUrl+'/deleteDetalleCategoria/'+id);
  }
}
