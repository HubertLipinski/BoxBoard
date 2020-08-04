import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Product} from '../../models/Product';
import {ProductService} from '../../services/product.service';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  @Input() product: Product;
  @Output() done = new EventEmitter<boolean>();
  @Output() productChange = new EventEmitter<Product>();

  editForm: FormGroup;
  submitted = false;
  loading = false;

  selectedImg: File = null;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
  ) {
  }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      name: [this.product.name],
      description: [this.product.description],
    });
  }

  get form() { return this.editForm.controls; }

  fileSelected(event) {
    this.selectedImg = event.target.files[0] as File;
    this.editForm.addControl('image', new FormControl(this.selectedImg));
  }

  onSubmit() {
    if (this.editForm.invalid) {
      return;
    }
    this.loading = true;
    this.productService.update(this.editForm.value, this.product.id).subscribe(
      data => {
          this.product = data;
          this.close();
          this.productChange.emit(data);
        },
        err => {
          this.loading = false;
          console.log(err);
        }
    );
  }

  close() {
    this.loading = false;
    this.done.emit(true);
  }
}
