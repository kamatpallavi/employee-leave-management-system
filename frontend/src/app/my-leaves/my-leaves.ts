import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Leave } from '../leave';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-my-leaves',
  imports: [CommonModule, FormsModule],
  templateUrl: './my-leaves.html',
  styleUrl: './my-leaves.css',
})
export class MyLeaves {
 myleaves: any[] = [];
  constructor(
  private leaveService: Leave
) {}

myleavesList() {
    // Get JWT token from local storage
    const token = localStorage.getItem('token');

    // Get the payload part of the JWT
    const payload = token!.split('.')[1];

    // Decode the payload
    const decodedPayload = JSON.parse(atob(payload));
    console.log(decodedPayload);
    // Get user ID from the JWT
    const id = Number(
  decodedPayload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
);
      
    // Pass the dynamic user ID to the service
    this.leaveService.getMyLeaves().subscribe({
      next: (response: any) => {
        console.log("6. API RESPONSE:", response);
        this.myleaves = response;
      },
      error: (error) => {
        console.log(error);
        alert(error.error);
      }
    });

}}
