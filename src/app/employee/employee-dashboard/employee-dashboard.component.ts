import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.css'
})
export class EmployeeDashboardComponent implements OnInit {
 today = new Date();
  
  // Data for the summary cards
  stats = [
    { label: 'Feedback Given', value: 9, trend: 8, icon: 'bi-pencil-square', bgClass: 'bg-primary-soft' },
    { label: 'Feedback Received', value: 7, trend: 12, icon: 'bi-chat-left-dots', bgClass: 'bg-warning-soft' },
    { label: 'Recognition Points', value: 4, trend: 20, icon: 'bi-award', bgClass: 'bg-success-soft' },
    { label: 'Notifications', value: 3, trend: 0, icon: 'bi-bell', bgClass: 'bg-danger-soft' }
  ];

  name:string='Guest';

  constructor(private authService :AuthService){}

  ngOnInit(): void {
    this.authService.user$.subscribe(user =>{
      if(user){
        this.name = user.name || 'Guest';
      }
    });
}
}