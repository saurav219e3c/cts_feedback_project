
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Feedback {
  id: number;
  employeeName: string;
  category: string;
  date: string;   // ISO format 'YYYY-MM-DD'
  status: 'Pending' | 'Acknowledged' | 'Resolved';
}

@Component({
  selector: 'app-manager-feedback',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manager-feedback.component.html',
  styleUrls: ['./manager-feedback.component.css']
})
export class ManagerFeedbackComponent implements OnInit {
  feedbackList: Feedback[] = [
    { id: 1, employeeName: 'Rahul', category: 'Work Quality', date: '2025-02-10', status: 'Pending' },
    { id: 2, employeeName: 'Amit',  category: 'Team Work',    date: '2025-02-09', status: 'Acknowledged' },
    { id: 3, employeeName: 'Sneha', category: 'Communication', date: '2025-02-08', status: 'Resolved' }
  ];

  filteredList: Feedback[] = [];
  searchText = '';

  ngOnInit(): void {
    this.filteredList = [...this.feedbackList];
  }

  filterFeedback(): void {
    const q = this.searchText.trim().toLowerCase();
    this.filteredList = q
      ? this.feedbackList.filter(f =>
          (f.employeeName ?? '').toLowerCase().includes(q)
        )
      : [...this.feedbackList];
  }

  viewFeedback(id: number): void {
    alert('View Feedback ID: ' + id);
    // Later: this.router.navigate(['/manager/feedback', id]);
  }

  // Optional: improves ngFor performance
  trackById(_: number, item: Feedback): number {
    return item.id;
  }
}
