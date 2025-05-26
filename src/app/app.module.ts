import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms'; // <--- Importa FormsModule

// Components
import { HomeComponent } from './components/home/home.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ProductoDetalleComponent } from './components/producto-detalle/producto-detalle.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { AdministradorComponent } from './components/administrador/administrador.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { LoginComponent } from './components/login/login.component';
import { NovedadesComponent } from './components/novedades/novedades.component';
import { OfertasComponent } from './components/ofertas/ofertas.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminProductoComponent } from './components/administrador/admin-producto/admin-producto.component';
import { AdminMarcaComponent } from './components/administrador/admin-marca/admin-marca.component';
import { ProcesarCompraComponent } from './components/procesar-compra/procesar-compra.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductosComponent,
    ProductoDetalleComponent,
    CarritoComponent,
    AdministradorComponent,
    ContactoComponent,
    LoginComponent,
    NovedadesComponent,
    OfertasComponent,
    NavbarComponent,
    AdminProductoComponent,
    AdminMarcaComponent,
    ProcesarCompraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
