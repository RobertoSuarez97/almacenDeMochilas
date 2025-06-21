import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdministradorComponent } from './administrador.component';
import { AdminProductoComponent } from './admin-producto/admin-producto.component';
import { AdminMarcaComponent } from './admin-marca/admin-marca.component';

@NgModule({
  declarations: [
    AdministradorComponent,
    AdminProductoComponent,
    AdminMarcaComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule, // El enrutamiento específico del módulo de admin
    FormsModule,
    ReactiveFormsModule,
    RouterModule // Asegúrate de que RouterModule esté aquí si usas routerLink dentro de los componentes de admin que no sean parte de AdminRoutingModule
  ]
})
export class AdminModule { }
