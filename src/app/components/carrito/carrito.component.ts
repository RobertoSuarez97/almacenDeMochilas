import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.cargarCarrito();
  }

  cargarCarrito() {
    this.carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    console.log(this.carrito.length)
  }

  eliminarProducto(id: number) {
    this.carrito = this.carrito.filter(p => p.id !== id);
    Swal.fire('¡Producto eliminado del carrito!', '', 'info');
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }

  calcularPrecioConDescuento(precio: number, descuento: number): number {
    return (precio * (1 - descuento / 100)).toFixed(2) as unknown as number;
  }

  calcularTotal(): number {
    return this.carrito.reduce((total, producto) => total + (this.calcularPrecioConDescuento(producto.precio, producto.descuento) * producto.cantidad), 0);
  }

  calcularDescuentoTotal(): number {
    return this.carrito.reduce((total, producto) => total + ((producto.precio * producto.cantidad ) - (this.calcularPrecioConDescuento(producto.precio, producto.descuento) * producto.cantidad)), 0);
  }

  procederPago() {
    this.router.navigate(['/procesar-compra']);
  }



}
