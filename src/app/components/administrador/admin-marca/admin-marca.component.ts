import { Component, OnInit } from '@angular/core';
import { MarcasService } from 'src/app/services/marcas.service';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-marca',
  templateUrl: './admin-marca.component.html',
  styleUrls: ['./admin-marca.component.css']
})
export class AdminMarcaComponent implements OnInit {
  marcas: any;
  selectPhoto = false;

  isModalOpen = false;
  isModalOpenUpdate = false;
  marca = {
    id: 0,
    nombre: ''
  };

  constructor(private prodService: ProductosService, private marcaService: MarcasService) {}

  ngOnInit(): void {
      this.getData();
  }

  getData(){
      this.marcaService.getMarcas().subscribe(marResponse => {
        this.marcas = marResponse;
      }, err => {console.log(err)});
  }

  addMarca() {
    // Validar que los campos están completos
    if (!this.marca.nombre) {
      Swal.fire('¡Llena todos los campos para continuar!', '', 'warning');
      return;
    }

    // Enviar el FormData al backend
    this.marcaService.addMarca({'nombre': this.marca.nombre}).subscribe(
      (response) => {
        this.closeModal();
        this.getData();
        this.marca = {
          id: 0,
          nombre: ''
        };
        Swal.fire('¡Producto agregado correctamente!', '', 'success');
      },
      (err) => {
        console.error(err);
        this.marca = {
          id: 0,
          nombre: ''
        };
        Swal.fire('Error al agregar el producto', '', 'error');
      }
    );
  }

  editMarca(id: any) {
  // Validar que los campos están completos
  if (!this.marca.nombre) {
    Swal.fire('¡Llena todos los campos para continuar!', '', 'warning');
    return;
  }


    // Enviar el FormData al backend
    this.marcaService.updateMarca(id, {'nombre': this.marca.nombre}).subscribe(
    (response) => {
      this.closeModal();
      this.getData();
      this.marca = {
        id: 0,
        nombre: ''
      };
      Swal.fire('¡Producto actualizado correctamente!', '', 'success');
    },
    (err) => {
      console.error(err);
      this.marca = {
        id: 0,
        nombre: ''
      };
      Swal.fire('Error al actualizar el producto', '', 'error');
    }
    );
  }

  deleteMarca(product: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Estás a punto de eliminar el producto "${product.name}".`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // this.products = this.products.filter((p) => p.id !== product.id);
        Swal.fire('¡Producto eliminado!', '', 'success');
      }
    });
  }

  openModal() {
    this.marca = {
      id: 0,
      nombre: ''
    };
    this.isModalOpen = true;
  }

  openModalUpdate(id: any) {
    this.marcaService.getMarca(id).subscribe(response => {
      this.marca = {
        id: response.id,
        nombre: response.nombre
      };
        this.isModalOpenUpdate = true;
      }, err => {console.log(err)});
  }

  closeModal() {
    this.isModalOpen = false;
    this.isModalOpenUpdate = false;
  }


}
