import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
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
export class Dashboard implements OnInit {

  leaves: any[] = [];
  email: string = '';
  role: string = '';

  constructor(
    private leaveService: Leave,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  // Runs automatically when Dashboard opens
  ngOnInit() {

    const decodedPayload = this.getTokenData();

    this.role = decodedPayload[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ];

    this.email = decodedPayload[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
    ];

    console.log("ROLE:", this.role);
    console.log("EMAIL:", this.email);
  }


  // Decodes the JWT and returns its payload
  getTokenData() {

    const token = localStorage.getItem('token');

    const payload = token!.split('.')[1];

    const decodedPayload = JSON.parse(atob(payload));

    return decodedPayload;
  }


  // Runs when View Balance is clicked
  getLeaveBalance() {

    const decodedPayload = this.getTokenData();

    const id = Number(
      decodedPayload[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ]
    );

    console.log("USER ID:", id);

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


  // Runs when My Leaves is clicked
  viewLeaves() {

    this.router.navigate(['/my-leaves']);
  }

  pendingRequests() {
  this.router.navigate(['/pending-requests']);
}
}