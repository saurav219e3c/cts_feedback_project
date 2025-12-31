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
    { label: 'Feedback Given', value: 12, trend: 8, icon: 'bi-pencil-square', bgClass: 'bg-primary-soft' },
    { label: 'Feedback Received', value: 24, trend: 12, icon: 'bi-chat-left-dots', bgClass: 'bg-warning-soft' },
    { label: 'Recognition Points', value: 450, trend: 20, icon: 'bi-award', bgClass: 'bg-success-soft' },
    { label: 'Notifications', value: 5, trend: 0, icon: 'bi-bell', bgClass: 'bg-danger-soft' }
  ];

  name:string='Tejas';
}