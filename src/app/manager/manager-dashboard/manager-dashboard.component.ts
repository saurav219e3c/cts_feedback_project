import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-manager-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './manager-dashboard.component.html'
})
export class ManagerDashboardComponent implements OnInit, OnDestroy {
  // Target Data
  data = {
    totalFeedback: 1284,
    pendingReviews: 42,
    engagementScore: 88,
    acknowledged: 912,
    growthPercent: 2.4
  };

  // Animation values
  display = {
    totalFeedback: 0,
    pendingReviews: 0,
    engagementScore: 0,
    acknowledged: 0
  };

  searchQuery: string = '';
  private timer: any;

  // Detailed activities
  activities = [
    { title: 'New Feedback', user: 'Amit', detail: 'Team Work', time: '2m ago', colorClass: 'blue' },
    { title: 'Review Completed', user: 'Sneha', detail: 'Communication', time: '1h ago', colorClass: 'emerald' },
    { title: 'Pending', user: 'Rahul', detail: 'Work Quality', time: '', colorClass: 'amber' }
  ];

  ngOnInit() {
    this.animate();
  }

  ngOnDestroy() {
    if (this.timer) clearInterval(this.timer);
  }

  get filteredActivities() {
    return this.activities.filter(a => 
      a.user.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
      a.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  animate() {
    const steps = 60;
    const interval = 1500 / steps;
    let i = 0;

    this.timer = setInterval(() => {
      i++;
      const ratio = i / steps;
      this.display.totalFeedback = Math.round(this.data.totalFeedback * ratio);
      this.display.pendingReviews = Math.round(this.data.pendingReviews * ratio);
      this.display.engagementScore = Math.round(this.data.engagementScore * ratio);
      this.display.acknowledged = Math.round(this.data.acknowledged * ratio);

      if (i === steps) clearInterval(this.timer);
    }, interval);
  }

  downloadReport() {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Performance Dashboard Report', 10, 20);
    doc.setFontSize(12);
    doc.text(`Total Feedback: ${this.data.totalFeedback}`, 10, 40);
    doc.text(`Pending Reviews: ${this.data.pendingReviews}`, 10, 50);
    doc.text(`Engagement Score: ${this.data.engagementScore}%`, 10, 60);
    doc.save('dashboard-report.pdf');
  }
}