import { Component, ChangeDetectorRef } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { Leave } from '../leave';


@Component({

  selector: 'app-dashboard',

  imports: [CommonModule, FormsModule],

  templateUrl: './dashboard.html',

  styleUrl: './dashboard.css',

})

export class Dashboard {

  leaves: any[] = [];
  email: string = '';

  constructor(
  private leaveService: Leave,
  private cdr: ChangeDetectorRef
) {}

  getLeaveBalance() {
     
    // Get JWT token from local storage
    const token = localStorage.getItem('token');

    // Get the payload part of the JWT
    const payload = token!.split('.')[1];

    // Decode the payload
    const decodedPayload = JSON.parse(atob(payload));
    this.email = decodedPayload[
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
];
    console.log(decodedPayload);
    // Get user ID from the JWT
    const id = Number(
  decodedPayload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
);
      
    // Pass the dynamic user ID to the service
    this.leaveService.getLeaveBalance(id).subscribe({

      next: (response: any) => {
         console.log("6. API RESPONSE:", response);
        this.leaves = response;
        this.cdr.detectChanges();
        
        

      },

      error: (error) => {
       
        console.log(error);

        alert(error.error);

      }

    });
   
  }

}