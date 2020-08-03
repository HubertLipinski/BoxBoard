import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from '../../../services/auth-service.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AlertService} from '../../../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted =  false;
  loading = false;
  redirect = '/';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private authServiceService: AuthServiceService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    if (this.authServiceService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  get form() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authServiceService.login(this.form.email.value, this.form.password.value).subscribe(
      data => { this.router.navigate([this.redirect]); },
      err => {
        this.alertService.error(err.error.message);
        this.loading = false;
      }
    );
  }

}
