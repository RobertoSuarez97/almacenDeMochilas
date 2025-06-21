import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; // Importar HTTP_INTERCEPTORS
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

// Interceptors
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';

// Components
import { HomeComponent } from './components/home/home.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ProductoDetalleComponent } from './components/producto-detalle/producto-detalle.component';
import { CarritoComponent } from './components/carrito/carrito.component';
// AdministradorComponent, AdminProductoComponent, AdminMarcaComponent se mueven a AdminModule
import { ContactoComponent } from './components/contacto/contacto.component';
import { LoginComponent } from './components/login/login.component';
import { NovedadesComponent } from './components/novedades/novedades.component';
import { OfertasComponent } from './components/ofertas/ofertas.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProcesarCompraComponent } from './components/procesar-compra/procesar-compra.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductosComponent,
    ProductoDetalleComponent,
    CarritoComponent,
    // AdministradorComponent, // Movido
    ContactoComponent,
    LoginComponent,
    NovedadesComponent,
    OfertasComponent,
    NavbarComponent,
    // AdminProductoComponent, // Movido
    // AdminMarcaComponent, // Movido
    ProcesarCompraComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
