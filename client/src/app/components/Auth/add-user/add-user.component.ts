import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from '../../../services/auth-service.service';
import {ProductService} from '../../../services/product.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get form() { return this.userForm.controls; }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.create(this.userForm.value).subscribe(
      data => {
        this.loading = false;
        this.router.navigate(['/admin/users']);
      },
      err => {
        this.loading = false;
        console.log(err);
      }
    );
  }

}
