import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Leave } from '../leave';

@Component({
  selector: 'app-my-leaves',
  imports: [CommonModule, FormsModule],
  templateUrl: './my-leaves.html',
  styleUrl: './my-leaves.css',
})
export class MyLeaves {

  myleaves: any[] = [];

  constructor(
    private leaveService: Leave,
    private cdr: ChangeDetectorRef
  ) {}

  myleavesList() {

    this.leaveService.getMyLeaves().subscribe({

      next: (response: any) => {

        console.log("MY LEAVES:", response);

        this.myleaves = response;

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.log(error);
        alert(error.error);
      }

    });
  }
}