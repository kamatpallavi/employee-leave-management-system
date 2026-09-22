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
getPendingRequests() {
  return this.http.get(`https://localhost:7291/api/Leave/pending`);
}

approveLeave(id: number) {
  return this.http.put(
    `https://localhost:7291/api/Leave/approve/${id}`,
    {},
    { responseType: 'text' }
  );
}

rejectLeave(id: number) {
  return this.http.put(`https://localhost:7291/api/Leave/reject/${id}`, {},{ responseType: 'text' });
}


getmyattendance() {
  return this.http.get(`https://localhost:7291/api/Attendance/my-attendance`);  
}


punchin(){
   return this.http.post(`https://localhost:7291/api/Attendance/punch-in`, {}, { responseType: 'text' });  
}


punchout(){
  return this.http.post(`https://localhost:7291/api/Attendance/punch-out`, {}, { responseType: 'text' });  
}
}
