import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Feedback {
  id: number;
  employeeName: string;
  category: string;
  date: string;
  status: 'Pending' | 'Acknowledged' | 'Resolved';
  details: string;
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
    { id: 1, employeeName: 'Rahul', category: 'Work Quality', date: '2025-02-10', status: 'Pending', details: 'High quality output on the latest sprint.' },
    { id: 2, employeeName: 'Amit',  category: 'Team Work',    date: '2025-02-09', status: 'Acknowledged', details: 'Great collaboration with the design team.' },
    { id: 3, employeeName: 'Sneha', category: 'Communication', date: '2025-02-08', status: 'Resolved', details: 'Clear and concise documentation provided.' }
  ];

  filteredList: Feedback[] = [];
  searchText = '';

  ngOnInit(): void {
    this.filteredList = [...this.feedbackList];
  }

  filterFeedback(): void {
    const q = this.searchText.trim().toLowerCase();
    this.filteredList = this.feedbackList.filter(f =>
      f.employeeName.toLowerCase().includes(q)
    );
  }

  updateStatus(id: number, newStatus: 'Acknowledged' | 'Resolved'): void {
    const item = this.feedbackList.find(f => f.id === id);
    if (item) {
      item.status = newStatus;
      this.filterFeedback();
    }
  }

  downloadSinglePDF(feedback: Feedback) {
    const doc = new jsPDF();
    doc.text(`Feedback: ${feedback.employeeName}`, 14, 20);
    autoTable(doc, {
      startY: 30,
      head: [['Field', 'Details']],
      body: [
        ['Employee', feedback.employeeName],
        ['Category', feedback.category],
        ['Date', feedback.date],
        ['Status', feedback.status],
        ['Details', feedback.details]
      ],
    });
    doc.save(`${feedback.employeeName}_feedback.pdf`);
  }

  downloadFullReport() {
    const doc = new jsPDF();
    doc.text('Team Feedback Report', 14, 20);
    autoTable(doc, {
      startY: 30,
      head: [['#', 'Employee', 'Category', 'Date', 'Status']],
      body: this.filteredList.map((f, i) => [i + 1, f.employeeName, f.category, f.date, f.status]),
    });
    doc.save('full_report.pdf');
  }

  viewFeedback(id: number): void {
    alert('Viewing feedback details for ID: ' + id);
  }

  trackById(_: number, item: Feedback): number {
    return item.id;
  }
}