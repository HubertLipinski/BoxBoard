import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  get() { return localStorage.getItem('token'); }

  set(token: string) { localStorage.setItem('token', token); }

  revoke() { localStorage.removeItem('token'); }

  exists(): boolean {
    return !!localStorage.getItem('token');
  }
}
