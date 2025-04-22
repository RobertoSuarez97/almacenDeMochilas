import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  private baseUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { username, password });
  }

  saveToken(token: string) {
    localStorage.setItem('tokenAlmacen', token);
  }

  getToken() {
    return localStorage.getItem('tokenAlmacen');
  }

  logout() {
    console.log('entro');
    localStorage.removeItem('tokenAlmacen');
    this.router.navigate(['/home']);
  }

  isAdminLoggedIn(){
    return this.getToken() !== null;
  }
}
