import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: any = [];

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

        acc[categoria_id].productos.push({
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
        });
      }
        return acc;
      }, {});
      this.productos = Object.values(productosPorCategoria);
    }, err => {
      console.log(err);
    });
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

}
