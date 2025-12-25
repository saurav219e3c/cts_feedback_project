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
  feedbackGiven = 12;
  feedbackReceived = 8;
  recognitionPoints = 150;
  notifications = 3;

  // Added sample data so your Recent Activity list isn't empty
  recentActivities = [];
}