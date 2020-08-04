import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
  editForm: FormGroup;
  submitted = false;
  loading = false;

  selectedImg: File = null;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) {
  }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      // user_id: [this.product.userId, Validators.required],
      name: [this.product.name],
      description: [this.product.description],
    });

    console.log('form: ', this.editForm);
  }

  get form() { return this.editForm.controls; }

  fileSelected(event) {
    this.selectedImg = event.target.files[0] as File;
    console.log(this.selectedImg);
    this.editForm.addControl('img', new FormControl(this.selectedImg));
  }

  onSubmit() {
    console.log('sending...', this.form);

    // pomyslna edycja
    // this.done.emit(true);
  }
}
