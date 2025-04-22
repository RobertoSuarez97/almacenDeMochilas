import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacionService } from '../services/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private autentication: AutenticacionService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    // Reemplaza con la lógica de autenticación
    if (this.autentication.isAdminLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']); // Redirigir al login si no está autenticado
      return false;
    }
  }

}
