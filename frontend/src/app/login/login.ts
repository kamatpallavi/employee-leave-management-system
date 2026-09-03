import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegistrationService } from '../registration';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email: string = '';
  password: string = '';

   constructor(private registrationService: RegistrationService) {

  }
  login() {
    const user = {
      email: this.email,
      password: this.password
    };
    console.log(user);
    this.registrationService.login(user).subscribe({
      next: (response:any) => {
        console.log("Response from backend:", response);

      console.log("JWT token:", response.token);

      localStorage.setItem('token', response.token);

      alert('User logged in successfully');
      },
      error: (error) => {
        console.log(error);
        alert(error.error);
      }
    });
  }
}
