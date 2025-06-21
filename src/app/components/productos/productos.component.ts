import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productosOriginales: any = []; // Para guardar todos los productos sin filtrar
  productosFiltrados: any = []; // Para mostrar los productos filtrados
  terminoBusqueda: string = '';

  // Para manejar el estado del botón "Agregar al carrito"
  textoBotonCarrito: { [key: number]: string } = {};
  botonCarritoDeshabilitado: { [key: number]: boolean } = {};

  constructor(private productoServices: ProductosService) {
    this.productoServices.getProductosPorCategorias().subscribe((data: any) => {
      const productosPorCategoria = data.reduce((acc: any, row: any) => {
        const {
          categoria_id,
          categoria_nombre,
          producto_id,
          producto_nombre,
          producto_descripcion,
          caracteristicas,
          precio,
          stock,
          marca_id,
          descuento,
          imagen_principal,
          marca_nombre
        } = row;

        if(categoria_id != null){
        if (!acc[categoria_id]) {
          acc[categoria_id] = {
            categoria_id,
            categoria_nombre,
            productos: [],
          };
        }

        const productoActual = { // Crear una variable para el objeto producto
          producto_id,
          producto_nombre,
          producto_descripcion,
          caracteristicas,
          precio,
          stock,
          marca_id,
          descuento,
          imagen_principal,
          marca_nombre
        };
        acc[categoria_id].productos.push(productoActual);
        // Inicializar estado del botón para este producto usando producto_id
        if (typeof producto_id !== 'undefined') {
          this.textoBotonCarrito[producto_id] = 'Agregar al carrito';
          this.botonCarritoDeshabilitado[producto_id] = false;
        }
      }
        return acc;
      }, {});
      this.productosOriginales = Object.values(productosPorCategoria);
      this.aplicarFiltro(); // Aplicar filtro inicialmente (mostrar todos si no hay término)
    }, err => {
      console.log(err);
    });
   }

  ngOnInit(): void {
  }

  aplicarFiltro(): void {
    if (!this.terminoBusqueda) {
      this.productosFiltrados = [...this.productosOriginales];
      return;
    }

    const termino = this.terminoBusqueda.toLowerCase();
    this.productosFiltrados = this.productosOriginales.map((categoria: any) => {
      // Filtrar productos dentro de cada categoría
      const productosFiltradosCategoria = categoria.productos.filter((producto: any) =>
        producto.producto_nombre.toLowerCase().includes(termino) ||
        (producto.producto_descripcion && producto.producto_descripcion.toLowerCase().includes(termino)) ||
        (producto.marca_nombre && producto.marca_nombre.toLowerCase().includes(termino))
      );
      // Devolver la categoría solo si tiene productos que coinciden con la búsqueda
      if (productosFiltradosCategoria.length > 0) {
        return { ...categoria, productos: productosFiltradosCategoria };
      }
      return null; // O un objeto vacío de categoría, o filtrar las categorías vacías después
    }).filter((categoria: any) => categoria !== null && categoria.productos.length > 0); // Eliminar categorías que quedaron vacías
  }

  onBusquedaChange(nuevoTermino: string): void {
    this.terminoBusqueda = nuevoTermino;
    this.aplicarFiltro();
  }

  agregarAlCarrito(producto: any) {
    if (!producto || typeof producto.producto_id === 'undefined') {
      console.error('Producto o ID de producto no definido:', producto);
      Swal.fire('Error', 'No se pudo agregar el producto (ID no encontrado).', 'error');
      return;
    }

    const productoId = producto.producto_id;

    if (this.botonCarritoDeshabilitado[productoId]) {
      return; // Evitar múltiples clics rápidos
    }

    let carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    // Asegurarse de que la comparación sea con producto_id
    const productoExistente = carrito.find((p: any) => p.producto_id === productoId);

    if (productoExistente) {
      productoExistente.cantidad += 1;
    } else {
      // Asegurarse de que el producto que se guarda en el carrito tenga producto_id
      carrito.push({ ...producto, producto_id: productoId, cantidad: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Cambiar temporalmente el texto y estado del botón
    this.textoBotonCarrito[productoId] = 'Añadido ✓';
    this.botonCarritoDeshabilitado[productoId] = true;

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
      this.textoBotonCarrito[productoId] = 'Agregar al carrito';
      this.botonCarritoDeshabilitado[productoId] = false;
    }, 2000); // Volver al estado original después de 2 segundos
  }
}
