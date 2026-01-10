import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.css'
})
export class EmployeeDashboardComponent {
 today = new Date();
  
  // Data for the summary cards
  stats = [
    { label: 'Feedback Given', value: 9, trend: 8, icon: 'bi-pencil-square', bgClass: 'bg-primary-soft' },
    { label: 'Feedback Received', value: 7, trend: 12, icon: 'bi-chat-left-dots', bgClass: 'bg-warning-soft' },
    { label: 'Recognition Points', value: 4, trend: 20, icon: 'bi-award', bgClass: 'bg-success-soft' },
    { label: 'Notifications', value: 3, trend: 0, icon: 'bi-bell', bgClass: 'bg-danger-soft' }
  ];

  name:string='Tejas';

  //for 
  //name:string='';
  // constructor(private empService: EmployeeService) {
  //   const user = this.empService.getCurrentUser();
  //   this.name = user ? this.getUserNameFromId(user) : 'Guest'; // Add helper or fetch from service
  // }

  // // Add helper to get name from ID (using dummy data)
  // private getUserNameFromId(id: string): string {
  //   const employees = this.empService.getDummyEmployees();
  //   const emp = employees.find(e => e.id === id);
  //   return emp ? emp.name : 'Unknown';
  // }
  
}