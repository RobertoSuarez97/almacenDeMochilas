import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']
})
export class OfertasComponent implements OnInit {


  productosOfertas: any;

  constructor(private productService: ProductosService) {
    this.productService.getOfertas().subscribe(data => {
      this.productosOfertas = data;
    }, err => {});
   }

  ngOnInit(): void {
  }

}
