import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Ocurrió un error desconocido.';
        if (error.error instanceof ErrorEvent) {
          // Error del lado del cliente o de red
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // El backend retornó un código de error
          // El cuerpo del error puede contener pistas sobre qué falló
          if (error.status === 0) {
            errorMessage = 'No se pudo conectar con el servidor. Verifica tu conexión a internet.';
          } else if (error.status === 401 && error.error && error.error.message === 'Token no proporcionado o inválido') {
            // No mostrar alerta global para errores de token específicos que se manejan localmente (ej. login)
            // o redirigir a login si es un token expirado en una ruta protegida.
            // Por ahora, lo dejamos pasar para que el servicio/componente lo maneje.
            return throwError(error);
          } else {
            errorMessage = `Error ${error.status}: ${error.message || 'Error del servidor'}`;
          }
        }

        // Evitar mostrar múltiples alertas para errores de login que ya se manejan localmente
        if (!request.url.includes('/api/auth/login')) {
            Swal.fire({
                icon: 'error',
                title: 'Error de Comunicación',
                text: errorMessage,
                confirmButtonText: 'Entendido'
            });
        }

        return throwError(error);
      })
    );
  }
}
