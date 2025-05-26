import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']
})
export class OfertasComponent implements OnInit {


  productosOfertas: any;

  constructor(private productService: ProductosService) {
    this.productService.getOfertas().subscribe(data => {
      this.productosOfertas = data;
    }, err => {});
   }

  ngOnInit(): void {
  }

  agregarAlCarrito(producto: any) {
    let carrito = JSON.parse(localStorage.getItem('carrito') || '[]');

    // Verificar si ya existe el producto
    const productoExistente = carrito.find((p: any) => p.id === producto.id);

    if (productoExistente) {
      productoExistente.cantidad += 1; // Suma si ya existe
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    Swal.fire('¡Producto agregado correctamente!', '', 'success');
  }

  calcularPrecioConDescuento(precio: number, descuento: number): number {
    return (precio * (1 - descuento / 100)).toFixed(2) as unknown as number;
  }

}
