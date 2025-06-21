import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutenticacionService } from './autenticacion.service'; // Para obtener el token si es necesario para pedidos

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  // La URL base del API de pedidos DEBE ser HTTPS en producción.
  private apiUrl = 'http://localhost:3000/api/pedidos'; // Reemplazar con la URL real del backend

  constructor(
    private http: HttpClient,
    private authService: AutenticacionService // Opcional, si necesitas token de autenticación de usuario para crear pedidos
  ) { }

  /**
   * Crea un nuevo pedido en el backend.
   * @param datosPedido Contiene el token de pago de la pasarela (ej. Mercado Pago),
   *                    los detalles del envío, y la información del pedido (ítems, cantidades).
   *                    El backend DEBE validar toda esta información, especialmente los ítems y
   *                    recalcular el total para evitar manipulaciones.
   *                    La comunicación DEBE ser por HTTPS.
   */
  crearPedido(datosPedido: any): Observable<any> {
    // NOTA DE SEGURIDAD:
    // 1. El endpoint `${this.apiUrl}` DEBE ser HTTPS en producción.
    // 2. El backend DEBE validar exhaustivamente todos los datos recibidos.
    //    - Verificar la validez del token de pago con la pasarela.
    //    - Validar cada producto, cantidad y precio contra la base de datos.
    //    - Recalcular el total del pedido en el backend.
    //    - Validar la dirección de envío.
    // 3. Considerar la autenticación del usuario si los pedidos están ligados a cuentas.
    //    Si se requiere autenticación, el token JWT del usuario debería enviarse en los headers.

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Ejemplo si se necesitara un token de autenticación de usuario para crear el pedido:
    // const tokenUsuario = this.authService.getToken();
    // if (tokenUsuario) {
    //   headers = headers.append('Authorization', `Bearer ${tokenUsuario}`);
    // }

    return this.http.post(this.apiUrl, datosPedido, { headers });
  }

  // Otros métodos podrían incluir:
  // - getPedidoPorId(id: string): Observable<any>
  // - getPedidosPorUsuario(): Observable<any[]>
}
