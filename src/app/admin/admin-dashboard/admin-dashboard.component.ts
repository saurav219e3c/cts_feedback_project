import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  standalone:true,
  selector: 'app-admin-dashboard',
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {

  
totalUsers = 0;
  totalFeedback = 0;
  pendingReviews = 0;
  totalCategories = 0;

  // Optional: recent activity items (demo)
  activities: { text: string; time: string }[] = [];

  constructor() {}

  
ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    // Demo values; replace with API calls later
    this.totalUsers = 120;
    this.totalFeedback = 450;
    this.pendingReviews = 18;
    this.totalCategories = 9;

    
  //Optional demo activity
    this.activities = [
      { text: 'New user registered', time: '10:05 AM' },
      { text: 'Feedback received from Jane', time: '09:52 AM' },
      { text: 'Category “Electronics” updated', time: '09:30 AM' },
    ];
  }



}
