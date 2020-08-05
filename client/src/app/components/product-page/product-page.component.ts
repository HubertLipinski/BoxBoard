import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/Product';
import {AlertService} from '../../services/alert.service';
import {AuthServiceService} from '../../services/auth-service.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  productId: string;
  product: Product;
  loading: boolean;
  error: boolean;
  edit = false;

  constructor(
    private route: ActivatedRoute,
    private alertService: AlertService,
    private router: Router,
    private productService: ProductService,
    private authServiceService: AuthServiceService
  ) {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.loading = true;
    this.productService.get(parseInt(this.productId, 10)).subscribe(
      data => {
          this.product = data[0];
          this.loading = false;
        },
      err => {
          this.alertService.error(`Wystąpił błąd: ${err.status} ${err.statusText}`);
          this.loading = false;
          this.error = true;
      }
    );
  }

  ngOnInit() {
  }

  editProduct(value) {
    this.edit = !value;
  }

}
