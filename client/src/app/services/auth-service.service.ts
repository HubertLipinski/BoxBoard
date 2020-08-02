import { Injectable } from '@angular/core';
import {LoginRequest} from '../models/LoginRequest';
import {HttpClient} from '@angular/common/http';
import {LoginResponse} from '../models/Api/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private baseUrl = 'http://boxboard.local/api/auth';
  private loginResponse: LoginResponse;

  constructor(private http: HttpClient) {}

  login(loginRequest: LoginRequest) {
    return this.http.post(`${this.baseUrl}/login`, loginRequest).subscribe(
      data => console.log(data),
        error => console.log(error)
    );
  }

  register() {
    // todo
  }
}
