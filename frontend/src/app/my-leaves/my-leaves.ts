import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Leave } from '../leave';

@Component({
  selector: 'app-my-leaves',
  imports: [FormsModule],
  templateUrl: './my-leaves.html',
  styleUrl: './my-leaves.css',
})
export class MyLeaves {

  myleaves: any[] = [];

  constructor(
    private leaveService: Leave
  ) {}

  myleavesList() {

    this.leaveService.getMyLeaves().subscribe({

      next: (response: any) => {
        console.log("API RESPONSE:", response);
        this.myleaves = response;
      },

      error: (error) => {
        console.log(error);
        alert(error.error);
      }

    });
  }
}