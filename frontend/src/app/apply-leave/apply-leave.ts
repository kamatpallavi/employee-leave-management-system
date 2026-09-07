import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Leave } from '../leave';


@Component({
  selector: 'app-apply-leave',
  imports: [FormsModule],
  templateUrl: './apply-leave.html',
  styleUrl: './apply-leave.css',
})
export class ApplyLeave {
  leaveType: number = 0;
  fromDate: string = '';
  toDate: string = '';
  reason: string = '';
  
 
  constructor(
  private leaveService: Leave
  
) {}

applyLeave() {
   const leaveRequest = {
  leaveTypeId: this.leaveType,
  fromDate: this.fromDate,
  toDate: this.toDate,
  reason: this.reason
};
    console.log(leaveRequest);
    this.leaveService.applyLeave(leaveRequest).subscribe({
      next: (response) => {
        console.log(response);
        alert('Leave applied successfully');
      },
      error: (error) => {
        console.log(error);
        alert(error.error);
      }
    });
  }

}
