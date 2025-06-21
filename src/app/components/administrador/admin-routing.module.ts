import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministradorComponent } from './administrador.component';
import { AdminProductoComponent } from './admin-producto/admin-producto.component';
import { AdminMarcaComponent } from './admin-marca/admin-marca.component';
import { AdminGuard } from '../../guards/admin.guard';

const routes: Routes = [
  {
    path: '', // El path base para este módulo (será prefijado por '/administrador' en AppRoutingModule)
    component: AdministradorComponent,
    canActivate: [AdminGuard], // La guardia principal para toda la sección de admin
    children: [
      { path: 'productoAdmin', component: AdminProductoComponent },
      { path: 'marcaAdmin', component: AdminMarcaComponent },
      { path: '', redirectTo: 'productoAdmin', pathMatch: 'full' } // Redirige la ruta base de admin a productoAdmin
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
