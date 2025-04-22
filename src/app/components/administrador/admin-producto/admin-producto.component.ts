import { Component, OnInit } from '@angular/core';
import { CategoriasService } from 'src/app/services/categorias.service';
import { MarcasService } from 'src/app/services/marcas.service';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-producto',
  templateUrl: './admin-producto.component.html',
  styleUrls: ['./admin-producto.component.css']
})
export class AdminProductoComponent implements OnInit {
  products: any;
  marcas: any;
  categorias: any;

  categoria: any = [];
  selectedCategories: number[] = [];
  selectPhoto = false;

  isModalOpen = false;
  isModalOpenUpdate = false;
  product = {
    id: 0,
    name: '',
    description: '',
    caracteristicas: '',
    price: null,
    quantity: null,
    brand: '',
    discount: null,
    photo: null,
    gallery: [],
    galleryTemp: [],
    photoPreview: null,
    galleryPreview: [] as { imagen: any }[]
  };

  constructor(private prodService: ProductosService, private marcaService: MarcasService, private categoriaService: CategoriasService) {}

  ngOnInit(): void {
      this.getData();
  }

  getData(){
    this.prodService.getProductos().subscribe(response => {
      this.marcaService.getMarcas().subscribe(marResponse => {
        this.categoriaService.getCategorias().subscribe(catResponse => {
        this.products = response;
        this.marcas = marResponse;
        this.categorias = catResponse;
      }, err => {console.log(err)});
      }, err => {console.log(err)});
    }, err => {console.log(err)});
  }

  addProduct() {
    // Validar que los campos están completos
    if (!this.product.name || !this.product.description || !this.product.caracteristicas || !this.product.price ||
        !this.product.quantity || !this.product.brand || !this.product.photo) {
          console.log(this.product);
      Swal.fire('¡Llena todos los campos para continuar!', '', 'warning');
      return;
    }

    const formData = new FormData();

    // Agregar datos al FormData
    for (const key in this.product) {
      if (key !== 'photo' && key !== 'gallery') {
        formData.append(key, (this.product as any)[key]);
      }
    }

    // Agregar el archivo de foto
    formData.append('photo', this.product.photo);

    // Agregar imágenes de la galería al FormData
    this.product.gallery.forEach((file, index) => {
      formData.append(`gallery`, file);
    });
    // Enviar el FormData al backend
    this.prodService.addProducto(formData).subscribe(
      (response) => {
        this.closeModal();
        this.getData();
        this.resetProduct();
        this.categoriaService.addProductoCategorias(response.productId, this.categoria).subscribe(responseCat => {
          Swal.fire('¡Producto agregado correctamente!', '', 'success');
        }, err => { console.error(err); });
      },
      (err) => {
        console.error(err);
        this.resetProduct();
        Swal.fire('Error al agregar el producto', '', 'error');
      }
    );
  }

  editProduct(id: any) {
    const formData = new FormData();

    for (const key in this.product) {
      if (key !== 'photo' && key !== 'gallery') {
        formData.append(key, String((this.product as any)[key]));
      }
    }

    // Verificar si la imagen principal es un archivo antes de enviarla
if (this.product.photo && typeof this.product.photo === 'object') {
  formData.append('photo', this.product.photo as File);
}

    // Recorrer la galería y verificar si hay archivos nuevos
    this.product.gallery.forEach((file: any) => {
      if (file instanceof Blob) {
        formData.append('gallery', file as File);
      }
    });

    this.prodService.updateProducto(id, formData).subscribe(
      () => {
        this.closeModal();
        this.getData();
        Swal.fire('¡Producto actualizado correctamente!', '', 'success');
      },
      (err) => {
        console.error(err);
        Swal.fire('Error al actualizar el producto', '', 'error');
      }
    );
  }




  deleteProduct(product: any) {
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
    this.categoria = [];
    this.resetProduct();
    this.isModalOpen = true;
  }

  openModalUpdate(id: any) {
    this.prodService.getProducto(id).subscribe(response => {
      this.categoriaService.getProductoCategorias(id).subscribe(catResponse => {
      this.marcaService.getMarcas().subscribe(marResponse => {
        this.prodService.getGallery(id).subscribe(galleryResponse => {
          console.log(galleryResponse);
        this.selectedCategories = catResponse.map((item: any) => item.categoria_id);
        this.categoria = this.selectedCategories;
        this.product = {
          id: response.id,
          name: response.nombre,
          description: response.descripcion,
          caracteristicas: response.caracteristicas,
          price: response.precio,
          quantity: response.stock,
          brand: response.marca_id,
          discount: response.descuento,
          photo: response.imagen_principal,
          gallery: galleryResponse,
          galleryTemp: galleryResponse,
          photoPreview: null,
          galleryPreview: []
        };
        this.marcas = marResponse;
        this.isModalOpenUpdate = true;
      }, err => {console.log(err)});
      }, err => {console.log(err)});
      }, err => {console.log(err)});
    }, err => {console.log(err)});
  }

  closeModal() {
    this.isModalOpen = false;
    this.isModalOpenUpdate = false;
  }

  removeGalleryImage(index: number) {
    this.product.gallery.splice(index, 1);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.product.photo = file;

      // Vista previa de la imagen principal
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.product.photoPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onMultipleFilesSelected(event: any): void {
    const files = event.target.files;
    if (files.length > 0) {
      this.product.gallery = Array.from(files); // Guardamos los archivos en el array
      this.product.galleryPreview = []; // Reiniciamos las vistas previas

      // Iteramos sobre cada archivo para generar la vista previa
      for (const file of this.product.gallery) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.product.galleryPreview.push({ imagen: e.target.result });
        };
        reader.readAsDataURL(file);
      }
    }
    console.log('Galería seleccionada:', this.product.gallery);
    console.log('Vista previa de la galería:', this.product.galleryPreview);
  }

  checked(cat: any) {
    let pos = this.categoria.indexOf(cat)
    if (pos == -1) {
        this.categoria.push(cat);
      } else {
        this.categoria.splice(pos, 1);
      }
  }

  // Resetear el producto después de guardar o cerrar modal
resetProduct() {
  this.product = {
    id: 0,
    name: '',
    description: '',
    caracteristicas: '',
    price: null,
    quantity: null,
    brand: '',
    discount: null,
    photo: null,
    gallery: [],
    galleryTemp: [],
    photoPreview: null,
    galleryPreview: []
  };
  this.selectPhoto = false;
}
}
