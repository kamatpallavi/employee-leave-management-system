import { Component, OnInit } from '@angular/core';
import { Leave } from '../leave';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-attendance',
  imports: [CommonModule],
  templateUrl: './attendance.html',
  styleUrl: './attendance.css'
})
export class Attendance implements OnInit {

  attendances: any[] = [];

  constructor(private leaveService: Leave) {}

  ngOnInit() {
    this.getAttendance();
  }

  getAttendance() {
    this.leaveService.getmyattendance().subscribe({
      next: (response: any) => {
        console.log("ATTENDANCE:", response);
        this.attendances = response;
      },
      error: (error) => {
        console.log(error);
        alert(error.error);
      }
    });
  }

  punchIn() {
    this.leaveService.punchin().subscribe({
      next: (response: any) => {
        alert("Punched In Successfully");

        // Refresh attendance table
        this.getAttendance();
      },
      error: (error) => {
        console.log(error);
        alert(error.error);
      }
    });
  }

  punchOut() {
    this.leaveService.punchout().subscribe({
      next: (response: any) => {
        alert("Punched Out Successfully");

        // Refresh attendance table
        this.getAttendance();
      },
      error: (error) => {
        console.log(error);
        alert(error.error);
      }
    });
  }
}