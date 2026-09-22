import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Leave } from '../leave';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-attendance',
  imports: [FormsModule],
  templateUrl: './attendance.html',
  styleUrl: './attendance.css',
})
export class Attendance {
  constructor(private http: HttpClient, private leaveService: Leave) {}
  
  attendances: any[] = [];
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
      next:(response:any)=>{
        alert("Punched In Successfully");
      },
      error:(error)=>{
        console.log(error);
        alert(error.error);
      }
    });


  }

  punchOut(){
    this.leaveService.punchout().subscribe({
      next:(response:any)=>{
        alert("Punched Out Successfully");
      },
      error:(error)=>{
        console.log(error);
        alert(error.error);
      }
    });
  }
}
