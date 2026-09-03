import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegistrationService } from '../registration';

@Component({
  selector: 'app-registration',
  imports: [FormsModule],
  templateUrl: './registration.html',
  styleUrl: './registration.css',
})
export class Registration {

  name: string = '';
  email: string = '';
  password: string = '';
  role: string = '';
  departmentid: number = 0;

  constructor(private registrationService: RegistrationService) {

  }

  register() {

    const user = {
      name: this.name,
      email: this.email,
      passwordhash: this.password,
      role: this.role,
      departmentid: this.departmentid
    };
    console.log(user);
    this.registrationService.register(user).subscribe({
      next: (response) => {
        console.log(response);
        alert('User registered successfully');
      },
      error: (error) => {
        console.log(error);
        alert(error.error);
      }
    });
  }
}