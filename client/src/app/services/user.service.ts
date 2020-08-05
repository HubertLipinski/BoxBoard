import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.apiUrl + '/users';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<User[]>(this.baseUrl);
  }

  get(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  create(data): Observable<User> {
    return this.http.post<User>(this.baseUrl, data);
  }

  update(data, id): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${id}`, data);
  }

  delete(id): Observable<User> {
    return this.http.delete<User>(`${this.baseUrl}/${id}`);
  }
}
