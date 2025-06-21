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
    if (this.checkoutForm.invalid) {
      Object.keys(this.checkoutForm.controls).forEach(key => this.checkoutForm.controls[key].markAsTouched());
      Swal.fire('Formulario Inválido', 'Por favor, completa todos los campos requeridos.', 'warning');
      return;
    }

    // **ADVERTENCIA DE SEGURIDAD IMPORTANTE:**
    // NUNCA envíes los datos crudos de la tarjeta (número, CVV, fecha de expiración)
    // directamente desde el cliente a tu backend.
    // En lugar de eso, utiliza el SDK de Mercado Pago (o la pasarela de pago que elijas)
    // en el frontend para tokenizar la información de la tarjeta.
    // El SDK enviará los datos de la tarjeta directamente a los servidores de Mercado Pago
    // de forma segura y te devolverá un token de un solo uso.

    // Paso 1: Recopilar los datos de la tarjeta del formulario.
    // (Esto es solo para la simulación de la llamada al SDK)
    const cardDataForTokenization = {
      cardNumber: this.checkoutForm.value.cardNumber,
      cardholderName: this.checkoutForm.value.cardholderName,
      cardExpirationMonth: this.checkoutForm.value.cardExpirationMonth,
      cardExpirationYear: this.checkoutForm.value.cardExpirationYear,
      cardCVV: this.checkoutForm.value.cardCVV,
      identificationType: this.checkoutForm.value.identificationType,
      identificationNumber: this.checkoutForm.value.identificationNumber,
      email: this.checkoutForm.value.cardholderEmail // El email también suele ser parte del proceso de tokenización
    };

    console.log('Datos que se enviarían al SDK de Mercado Pago para tokenización:', cardDataForTokenization);

    // Paso 2: Simulación de la llamada al SDK de Mercado Pago para obtener el token.
    // En una implementación real, aquí llamarías a una función del SDK de Mercado Pago.
    // Ejemplo (conceptual):
    // mercadoPagoSDK.createToken(cardDataForTokenization)
    //   .then(token => {
    //     console.log('Token recibido de Mercado Pago:', token);
    //     this.enviarDatosAlBackend(token);
    //   })
    //   .catch(error => {
    //     console.error('Error al tokenizar la tarjeta:', error);
    //     Swal.fire('Error de Pago', 'No se pudo procesar la información de tu tarjeta. Intenta de nuevo.', 'error');
    //   });

    // Para esta simulación, generaremos un token falso y continuaremos.
    const fakePaymentToken = 'mp_tok_' + Date.now() + Math.random().toString(36).substring(2, 15);
    Swal.fire({
      title: 'Procesando Información de Pago',
      text: 'Tokenizando la tarjeta de forma segura...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    setTimeout(() => { // Simular la demora de la tokenización
      console.log('Token simulado recibido de Mercado Pago:', fakePaymentToken);
      this.enviarDatosAlBackend(fakePaymentToken);
    }, 2000);
  }

  enviarDatosAlBackend(paymentToken: string): void {
    const datosEnvio = {
      calle: this.checkoutForm.value.calle,
      numero: this.checkoutForm.value.numero,
      colonia: this.checkoutForm.value.colonia,
      localidad: this.checkoutForm.value.localidad,
      municipio: this.checkoutForm.value.municipio,
      estado: this.checkoutForm.value.estado,
      pais: this.checkoutForm.value.pais,
      telefono: this.checkoutForm.value.telefono,
      comentario: this.checkoutForm.value.comentario
    };

    const datosPedido = {
      // Es CRUCIAL que el backend valide estos productos y recalcule el total
      // basándose en los precios de la base de datos, no confiando en el total del cliente.
      items: this.carrito.map(p => ({ id: p.id, cantidad: p.cantidad, precioUnitarioAlComprar: p.precio })), // Enviar precio al momento de compra para referencia
      totalCalculadoPorCliente: this.total // Solo como referencia, el backend DEBE recalcular.
    };

    const datosParaBackend = {
      paymentToken: paymentToken, // El token de Mercado Pago
      datosEnvio: datosEnvio,
      datosPedido: datosPedido,
      emailComprador: this.checkoutForm.value.cardholderEmail // Email para el recibo, etc.
    };

    console.log('Datos que se enviarían al backend (incluyendo el token de pago):', datosParaBackend);

    // **NOTA DE SEGURIDAD:**
    // La comunicación con el backend DEBE ser a través de HTTPS.

    // Aquí llamarías a tu servicio (ej. PedidosService) para enviar `datosParaBackend`
    // a tu endpoint seguro en el backend.
    // Ejemplo:
    // this.pedidosService.crearPedido(datosParaBackend).subscribe(
    //   response => {
    //     Swal.fire('¡Pago Exitoso!', 'Tu pedido ha sido procesado.', 'success');
    //     localStorage.removeItem('carrito'); // Limpiar carrito
    //     this.router.navigate(['/home']); // O a una página de confirmación de pedido
    //   },
    //   error => {
    //     console.error('Error al procesar el pedido en el backend:', error);
    //     Swal.fire('Error en el Pedido', 'No se pudo completar tu pedido. Por favor, contacta a soporte.', 'error');
    //   }
    // );

    // Simulación de la llamada al backend
    this.paymentInitiated = true;
    setTimeout(() => { // Simular la demora del backend
      Swal.fire('¡Pago Simulado Exitoso!', 'Tu pedido ha sido procesado (simulación).', 'success');
      localStorage.removeItem('carrito');
      this.carrito = [];
      this.total = 0;
      this.router.navigate(['/home']); // O a una página de confirmación
    }, 2000);
  }

  volverAlCarrito(): void {
    this.router.navigate(['/carrito']);
  }
}
