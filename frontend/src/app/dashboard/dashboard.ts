import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Leave } from '../leave';
import { Router } from '@angular/router';

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
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  getLeaveBalance() {

    const token = localStorage.getItem('token');

    const payload = token!.split('.')[1];

    const decodedPayload = JSON.parse(atob(payload));

    this.email = decodedPayload[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
    ];

    console.log(decodedPayload);

    const id = Number(
      decodedPayload[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ]
    );

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

  viewLeaves() {
    this.router.navigate(['/my-leaves']);
  }

}