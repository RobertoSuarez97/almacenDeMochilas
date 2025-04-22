import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private autentication: AutenticacionService) { }

  ngOnInit(): void {
  }

  validLogin(){
    return this.autentication.isAdminLoggedIn()
  }

  logout(){
    this.autentication.logout();
  }

}
