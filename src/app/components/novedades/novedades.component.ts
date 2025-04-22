import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.css']
})
export class NovedadesComponent implements OnInit {

  productosNovedades: any;

  constructor(private productService: ProductosService) {
    this.productService.getNovedades().subscribe(data => {
      this.productosNovedades = data;
    }, err => {});
   }

  ngOnInit(): void {
  }

}
