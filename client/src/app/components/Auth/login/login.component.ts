import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from '../../../services/auth-service.service';
import {LoginRequest} from '../../../models/LoginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginRequest: LoginRequest = {
    email: null,
    password: null
  };

  constructor(private authServiceService: AuthServiceService) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.loginRequest);
    this.authServiceService.login(this.loginRequest);
  }

}
