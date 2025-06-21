import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css']
})
export class ProductoDetalleComponent implements OnInit {
  producto: any = null;
  galeria: string[] = [];
  imagenSeleccionada: string = '';

  // Para manejar el estado del botón "Agregar al carrito"
  textoBotonCarrito: string = 'Agregar al carrito';
  botonCarritoDeshabilitado: boolean = false;

  constructor(private route: ActivatedRoute, private productoService: ProductosService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) { // Asegurarse de que id no sea null
      this.obtenerProductoPorId(id);
    } else {
      console.error('ID del producto no encontrado en la ruta');
      // Considerar redirigir o mostrar un mensaje de error
    }
  }

  obtenerProductoPorId(id: string) { // id ya no es string | null
    this.productoService.getProducto(id).subscribe( res => {
      this.producto = res;
      // console.log(res);
      if (this.producto && this.producto.imagen_principal) {
        this.imagenSeleccionada = this.producto.imagen_principal;
      }
      this.obtenerGaleriaProducto(id);
      // Resetear estado del botón por si se navega entre productos
      this.textoBotonCarrito = 'Agregar al carrito';
      this.botonCarritoDeshabilitado = false;
    }, err => {
        console.error('Error al obtener producto:', err);
    });
  }

  obtenerGaleriaProducto(id: string | null) {
    this.productoService.getGallery(id).subscribe(
      res => {
        console.log('Respuesta galería:', res);

        // Mapear solo los nombres de imagen
        const imagenesGaleria = res.map((item: any) => item.imagen);

        console.log('Imágenes de galería:', imagenesGaleria);

        // Agregar imagen principal al inicio
        if (this.producto?.imagen_principal) {
          this.galeria = [this.producto.imagen_principal, ...imagenesGaleria];
        } else {
          this.galeria = [...imagenesGaleria];
        }

        console.log('Galería final:', this.galeria);
      },
      err => {
        console.error('Error al cargar galería:', err);
      }
    );
  }

  cambiarImagen(imagen: string) {
    this.imagenSeleccionada = imagen;
  }

  calcularPrecioConDescuento(precio: number, descuento: number): number {
    return (precio * (1 - descuento / 100)).toFixed(2) as unknown as number;
  }

  agregarAlCarrito(producto: any) {
    if (!producto || typeof producto.producto_id === 'undefined') {
      console.error('Producto o ID de producto no definido:', producto);
      Swal.fire('Error', 'No se pudo agregar el producto (ID no encontrado).', 'error');
      return;
    }

    if (this.botonCarritoDeshabilitado) {
      return; // Evitar múltiples clics rápidos
    }

    const productoId = producto.producto_id;
    let carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    const productoExistente = carrito.find((p: any) => p.producto_id === productoId);

    if (productoExistente) {
      productoExistente.cantidad += 1;
    } else {
      carrito.push({ ...producto, producto_id: productoId, cantidad: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));

    this.textoBotonCarrito = 'Añadido ✓';
    this.botonCarritoDeshabilitado = true;

    Swal.fire({
      title: '¡Producto agregado!',
      icon: 'success',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true
    });

    setTimeout(() => {
      // Solo resetear si el producto sigue siendo el mismo (por si el usuario navegó rápido)
      if (this.producto && this.producto.producto_id === productoId) {
        this.textoBotonCarrito = 'Agregar al carrito';
        this.botonCarritoDeshabilitado = false;
      }
    }, 2000);
  }
}
