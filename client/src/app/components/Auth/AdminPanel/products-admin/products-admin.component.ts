import { Component, OnInit } from '@angular/core';
import {Product} from '../../../../models/Product';
import {ProductService} from '../../../../services/product.service';
import {Router} from '@angular/router';

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
  toEdit = null;
  deletingProduct = null;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {
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

  edit(id: number) {
    this.toEdit = id;
  }

  delete(id: number, index: number) {
    this.deletingProduct = id;
    this.productService.delete(id).subscribe(
      response => {
        this.deletingProduct = null;
        window.location.reload();
      },
      err => {
        console.log(err);
      }
    );
  }

  close() {
    this.toEdit = null;
  }
}
