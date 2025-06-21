import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import Swal from 'sweetalert2'; // Importar SweetAlert2

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private autentication: AutenticacionService, private router: Router) {}

  onLogin() {
    this.autentication.login(this.username, this.password).subscribe(
      (response) => {
        if(response.message == 'Usuario no encontrado'){
          this.errorMessage = 'Usuario incorrecto';
        }
        else if(response.message == 'Password incorrecto'){
          this.errorMessage = 'Contraseña incorrecta';
        } else {
          this.autentication.saveToken(response.token);
          this.router.navigate(['/administrador']);
        }
      },
      (error) => {
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    );
  }

}
