import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  http = inject(HttpClient);

  register(formData: any) {
    return this.http.post('/api/auth/register', formData);
  }

  login(formData: any) {
    return this.http.post('/api/auth/login', formData);
  }

  logout() {
    return this.http.post('/api/auth/logout', '');
  }

  setup2fa() {
    return this.http.post('/api/auth/2fa/setup', '');
  }

  verify2fa(formData: any) {
    return this.http.post('/api/auth/2fa/verify', formData);
  }

  status() {
    return this.http.get('/api/auth/authStatus');
  }
}
