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
}
