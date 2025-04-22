import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private apiUrl = 'http://localhost:3000/api/productos'; // Actualiza con tu API real

  constructor(private http: HttpClient) { }

  getProductos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getNovedades(): Observable<any> {
    return this.http.get(this.apiUrl+'/novedades');
  }

  getOfertas(): Observable<any> {
    return this.http.get(this.apiUrl+'/ofertas');
  }

  getProductosPorCategorias(): Observable<any> {
    return this.http.get(this.apiUrl+'/getProductosPorCategorias');
  }

  getProducto(id:any): Observable<any> {
    return this.http.get(this.apiUrl+'/'+id);
  }

  getGallery(id:any): Observable<any> {
    return this.http.get(this.apiUrl+'/gallery/'+id);
  }

  updateProducto(id: number, productData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, productData);
  }

  addProducto(form: any): Observable<any> {
    return this.http.post(this.apiUrl+'/photoUpload', form);
  }
}
