import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ProductoDetalleComponent } from './components/producto-detalle/producto-detalle.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { AdministradorComponent } from './components/administrador/administrador.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { LoginComponent } from './components/login/login.component';
import { NovedadesComponent } from './components/novedades/novedades.component';
import { OfertasComponent } from './components/ofertas/ofertas.component';
import { AdminGuard } from './guards/admin.guard';
import { AdminProductoComponent } from './components/administrador/admin-producto/admin-producto.component';
import { AdminMarcaComponent } from './components/administrador/admin-marca/admin-marca.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'producto/:id', component: ProductoDetalleComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'administrador', component: AdministradorComponent,
    children: [
      { path: 'productoAdmin', component: AdminProductoComponent },
      { path: 'marcaAdmin', component: AdminMarcaComponent },
      { path: '**', redirectTo: 'productoAdmin', pathMatch: 'full' },
    ],
    canActivate: [AdminGuard] },
  { path: 'contacto', component: ContactoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'novedades', component: NovedadesComponent },
  { path: 'ofertas', component: OfertasComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
