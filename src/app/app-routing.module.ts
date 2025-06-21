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
import { AdminGuard } from './guards/admin.guard';
import { ProcesarCompraComponent } from './components/procesar-compra/procesar-compra.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'producto/:id', component: ProductoDetalleComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'procesar-compra', component: ProcesarCompraComponent },
  {
    path: 'administrador',
    loadChildren: () => import('./components/administrador/admin.module').then(m => m.AdminModule),
    canActivate: [AdminGuard] // Aunque el guard también está en admin-routing, puede ser útil mantenerlo aquí para proteger la carga del módulo
  },
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
