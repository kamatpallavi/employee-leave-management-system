import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) {

  }

  register(user: any) {

    return this.http.post(
      'https://localhost:7291/api/User/register',
      user, { responseType: 'text' }
    );

    
  }

  login(user: any) {

    return this.http.post(
      'https://localhost:7291/api/User/login',
      user
    );

    
  }
}