import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/User';
import {map} from 'rxjs/operators';
import {TokenService} from './token.service';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private baseUrl = environment.apiUrl + '/auth';
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User { return this.currentUserSubject.value; }

  login(email, password) {
    return this.http.post<any>(`${this.baseUrl}/login`, {email, password}).pipe(map(response => {
      let user = response.user;
      user.isAdmin = response.admin;
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.tokenService.set(response.accessToken);
      this.currentUserSubject.next(response.user);
      return response;
    }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.tokenService.revoke();
    this.currentUserSubject.next(null);
  }

  register(user: User) {
    return this.http.post<any>(`${this.baseUrl}/register`, user);
  }
}
