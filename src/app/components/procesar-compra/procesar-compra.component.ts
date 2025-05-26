import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-procesar-compra',
  templateUrl: './procesar-compra.component.html',
  styleUrls: ['./procesar-compra.component.css']
})
export class ProcesarCompraComponent implements OnInit {

  carrito: any[] = [];
  total: number = 0;
  checkoutForm!: FormGroup; // Un solo formulario para envío y pago
  paymentInitiated: boolean = false;
  months: number[] = Array.from({ length: 12 }, (_, i) => i + 1);
  years: number[] = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {
    this.carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    this.total = this.calcularTotal();
  }

  ngOnInit(): void {
    if (this.carrito.length === 0) {
      this.router.navigate(['/carrito']); // Si no hay carrito, redirigir
      return;
    }

    this.checkoutForm = this.fb.group({ // Formulario unificado
      calle: ['', Validators.required],
      numero: ['', Validators.required],
      colonia: ['', Validators.required],
      localidad: ['', Validators.required],
      municipio: ['', Validators.required],
      estado: ['', Validators.required],
      pais: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      comentario: [''],
      cardNumber: ['', Validators.required],
      cardExpirationMonth: ['', Validators.required],
      cardExpirationYear: ['', Validators.required],
      cardCVV: ['', Validators.required],
      cardholderName: ['', Validators.required],
      cardholderEmail: ['', [Validators.required, Validators.email]],
      identificationType: ['', Validators.required],
      identificationNumber: ['', Validators.required]
    });
  }

  calcularTotal(): number {
    let total = 0;
    for (const producto of this.carrito) {
      total += (producto.descuento && producto.descuento > 0)
        ? producto.precio * (1 - producto.descuento) * producto.cantidad
        : producto.precio * producto.cantidad;
    }
    return total;
  }


  calcularPrecioConDescuento(precio: number, descuento: number): number {
    return (precio * (1 - descuento / 100)).toFixed(2) as unknown as number;
  }

  eliminarProducto(id: number) {
    this.carrito = this.carrito.filter(p => p.id !== id);
    Swal.fire('¡Producto eliminado del carrito!', '', 'info');
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }

  procesarPagoMercadoLibre(): void {
    if (this.checkoutForm.valid) {
      const checkoutData = this.checkoutForm.value;
      console.log('Datos de envío y pago:', checkoutData);
      // Aquí integrarías la lógica para enviar los datos de envío y pago a tu backend
      // para procesar el pago con Mercado Libre.
      // Recuerda utilizar el SDK de Mercado Pago en el backend para esto.
      alert('Simulando envío de datos de envío y pago al backend...');
      this.paymentInitiated = true; // Simula que el pago se ha iniciado
      // Después de la respuesta del backend, podrías redirigir al usuario
      // o mostrar un mensaje de éxito/error.
    } else {
      Object.keys(this.checkoutForm.controls).forEach(key => this.checkoutForm.controls[key].markAsTouched());
      Swal.fire('Por favor, completa todos los campos requeridos.', '', 'warning');
    }
  }

  volverAlCarrito(): void {
    this.router.navigate(['/carrito']);
  }
}
