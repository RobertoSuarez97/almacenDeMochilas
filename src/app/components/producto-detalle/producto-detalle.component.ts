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


  constructor(private route: ActivatedRoute, private productoService: ProductosService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.obtenerProductoPorId(id);

  }

  obtenerProductoPorId(id: string | null) {
    this.productoService.getProducto(id).subscribe( res => {
      this.producto = res;
      console.log(res);
      this.imagenSeleccionada = this.producto.imagen_principal;
      this.obtenerGaleriaProducto(id);
    }, err => {
        console.log(err)
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
}
