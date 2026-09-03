import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Leave } from '../leave';


@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  leaves: any[] = [];

  constructor(private leaveService: Leave) {}
  getLeaveBalance(){
    this.leaveService.getLeaveBalance(1).subscribe({
      next:(response:any)=>{
        this.leaves=response;
      },
      error:(error)=>{
        console.log(error);
        alert(error.error);
      }
    });
  }
    
  }
 

