import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { Leave } from '../leave';

@Component({
  selector: 'app-pending-requests',
  imports: [FormsModule, CommonModule],
  templateUrl: './pending-requests.html',
  styleUrl: './pending-requests.css',
})
export class PendingRequests implements OnInit {

  requests: any[] = [];

  constructor(
    private leaveService: Leave,
  private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {

    this.leaveService.getPendingRequests().subscribe({

      next: (response: any) => {

        console.log("PENDING REQUESTS:", response);

        this.requests = response;
      

         console.log("REQUESTS ARRAY:", this.requests);
  console.log("REQUEST COUNT:", this.requests.length);
  this.cdr.detectChanges();
      },

      error: (error) => {

        console.log(error);

        alert(error.error);
        

      }

    });

  }


  approveLeave(id: number) {

    this.leaveService.approveLeave(id).subscribe({

      next: (response: any) => {

        console.log("Leave approved:", response);

        this.requests = this.requests.filter(request => request.id !== id);

        this.cdr.detectChanges();

      },

      error: (error) => {

        console.log(error);

        alert(error.error);

      }

    });

  }

  rejectLeave(id: number) {

    this.leaveService.rejectLeave(id).subscribe({

      next: (response: any) => {

        console.log("Leave rejected:", response);

        this.requests = this.requests.filter(request => request.id !== id);

        this.cdr.detectChanges();

      },

      error: (error) => {

        console.log(error);

        alert(error.error);

      }

    });

  }
}