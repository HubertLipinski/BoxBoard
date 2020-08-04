import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/Product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  loading: boolean;
  products: Array<Product>;
  totalRecords = '';
  page = 1;

  constructor(private productService: ProductService) {
    this.loading = true;
    this.productService.getAll().subscribe(items => {
      this.products = items;
      this.totalRecords = items.length;
      this.loading = false;
    });
  }

  ngOnInit() {
  }

}
