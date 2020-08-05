import {Component, OnInit} from '@angular/core';
import {AuthServiceService} from '../../../services/auth-service.service';
import {Router} from '@angular/router';
import {ProductService} from '../../../services/product.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  adminPanel: boolean;
  productForm: FormGroup;
  submitted = false;
  loading = false;
  selectedImg: File = null;

  constructor(
    private authServiceService: AuthServiceService,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.adminPanel = this.authServiceService.currentUserValue.isAdmin;
    this.productForm = this.formBuilder.group({
      user_id: [this.authServiceService.currentUserValue.id, Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, Validators.required],
      image: ['']
    });
  }

  ngOnInit() {
    if (!this.authServiceService.currentUserValue) {
      this.router.navigate(['/login']);
    }
  }

  get form() { return this.productForm.controls; }

  fileSelected(event) {
    this.selectedImg = event.target.files[0] as File;
    this.productForm.get('image').setValue(this.selectedImg);
  }

  onSubmit() {
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('user_id', this.productForm.get('user_id').value);
    formData.append('name', this.productForm.get('name').value);
    formData.append('description', this.productForm.get('description').value);
    formData.append('price', this.productForm.get('price').value);
    formData.append('image', this.selectedImg);

    this.loading = true;
    this.productService.create(formData).subscribe(
      data => {
        this.router.navigate(['/products']);
      },
      err => {
        this.loading = false;
        console.log(err);
      }
    );
  }

}
