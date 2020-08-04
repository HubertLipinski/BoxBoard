import { Component, OnInit } from '@angular/core';
import {Product} from '../../../../models/Product';
import {ProductService} from '../../../../services/product.service';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.scss']
})
export class ProductsAdminComponent implements OnInit {
  loading: boolean;
  products: Array<Product>;
  totalRecords = '';
  page = 1;

  constructor(private productService: ProductService) {
    this.loading = true;
    this.productService.getAll().subscribe(products => {
      this.products = products;
      this.totalRecords = products.length;
      this.loading = false;
      }
    );
  }

  ngOnInit() {
  }

}
