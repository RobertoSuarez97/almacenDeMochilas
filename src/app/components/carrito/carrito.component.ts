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

  // Usar producto_id que es el identificador consistente
  eliminarProducto(productoId: number) {
    this.carrito = this.carrito.filter(p => p.producto_id !== productoId);
    this.actualizarLocalStorageYNotificar('¡Producto eliminado del carrito!', 'info');
  }

  actualizarCantidad(productoId: number, cambio: number) {
    const productoEnCarrito = this.carrito.find(p => p.producto_id === productoId);
    if (productoEnCarrito) {
      productoEnCarrito.cantidad += cambio;
      if (productoEnCarrito.cantidad <= 0) {
        this.eliminarProducto(productoId); // Eliminar si la cantidad llega a 0 o menos
      } else {
        this.actualizarLocalStorageYNotificar('Cantidad actualizada.', 'success', true);
      }
    }
  }

  vaciarCarrito() {
    Swal.fire({
      title: '¿Vaciar carrito?',
      text: "¿Estás seguro de que deseas eliminar todos los productos del carrito?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, vaciar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.carrito = [];
        this.actualizarLocalStorageYNotificar('Carrito vaciado.', 'success');
      }
    });
  }

  private actualizarLocalStorageYNotificar(mensaje: string, tipoIcono: 'success' | 'error' | 'warning' | 'info' | 'question', esToast: boolean = false) {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
    if (esToast) {
      Swal.fire({
        title: mensaje,
        icon: tipoIcono,
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
      });
    } else {
      Swal.fire(mensaje, '', tipoIcono);
    }
    // Forzar la recarga de datos o detección de cambios si Angular no lo hace automáticamente
    this.carrito = [...this.carrito];
  }


  calcularPrecioConDescuento(precio: number, descuento: number): number {
    return (precio * (1 - descuento / 100)).toFixed(2) as unknown as number;
  }

  calcularTotal(): number {
    if (!this.carrito) return 0;
    return this.carrito.reduce((total, producto) => {
      const precioConDescuento = (producto.descuento && producto.descuento > 0)
        ? producto.precio * (1 - producto.descuento / 100)
        : producto.precio;
      return total + (precioConDescuento * producto.cantidad);
    }, 0);
  }

  // Este método ya no parece usarse en el HTML, pero lo mantengo por si acaso.
  // Si no se usa, se podría eliminar.
  calcularDescuentoTotal(): number {
    if (!this.carrito) return 0;
    return this.carrito.reduce((totalDescuento, producto) => {
      const precioOriginalTotal = producto.precio * producto.cantidad;
      const precioConDescuento = (producto.descuento && producto.descuento > 0)
        ? producto.precio * (1 - producto.descuento / 100)
        : producto.precio;
      const precioFinalTotal = precioConDescuento * producto.cantidad;
      return totalDescuento + (precioOriginalTotal - precioFinalTotal);
    }, 0);
  }

  procederPago() {
    this.router.navigate(['/procesar-compra']);
  }



}
