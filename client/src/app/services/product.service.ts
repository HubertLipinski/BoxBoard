import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = environment.apiUrl + '/products';
  private HttpUploadOptions = {
    headers: new HttpHeaders({ Accept: 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  get(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  create(data): Observable<Product> {
    return this.http.post<any>(this.baseUrl, data, this.HttpUploadOptions);
  }

  update(data, id): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${id}`, data, this.HttpUploadOptions);
  }

  delete(id): Observable<Product> {
    return this.http.delete<Product>(`${this.baseUrl}/${id}`);
  }
}
