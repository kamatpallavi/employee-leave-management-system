import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Leave {

  constructor(private http: HttpClient) {}

  getLeaveBalance(id: number) {
    return this.http.get(
      `https://localhost:7291/api/Leave/balance/${id}`
    );
  }


applyLeave(leaveRequest: any) {
  return this.http.post(
    `https://localhost:7291/api/Leave/apply`,
    leaveRequest,
    { responseType: 'text' }
  );
}

getMyLeaves() {
  return this.http.get(
    `https://localhost:7291/api/Leave/my-leaves`
  );
}
}