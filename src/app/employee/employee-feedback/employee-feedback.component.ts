import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
// interface Feedback {
//   id: string;
//   employeeName: string;
//   category: string;
//   comment: string;
//   date: string;
//   isAnonymous: boolean;
// }

interface Feedback {
  id: number;
  senderName: string;
  category: string;
  comments: string;
  date: string;
  isAnonymous: boolean;
}

@Component({
  selector: 'app-employee-feedback',
  imports: [CommonModule],
  templateUrl: './employee-feedback.component.html',
  styleUrl: './employee-feedback.component.css'
})


export class EmployeeFeedbackComponent implements OnInit {

  feedbackList=[
    {
      id: 1,
      senderName: "Sarah Jenkins",
      category: "Leadership",
      comments: "Great job leading the sprint planning yesterday. You kept everyone on track and focused!",
      date: "2023-10-15"
    },
    {
      id: 2,
      senderName: "Michael Chen",
      category: "Technical",
      comments: "Your code review comments were incredibly helpful. I learned a lot about optimizing SQL queries.",
      date: "2023-10-12"
    },
    {
      id: 3,
      senderName: "Emily Rodriguez",
      category: "Teamwork",
      comments: "Thanks for jumping in to help with the client presentation at the last minute. Total lifesaver!",
      date: "2023-10-10"
    },
    {
      id: 4,
      senderName: "Emily Rodriguez",
      category: "Teamwork",
      comments: "Thanks for jumping in to help with the client presentation at the last minute. Total lifesaver!",
      date: "2023-10-10",
      isAnonymous:true
    }
  ];

  constructor() { }

  ngOnInit(): void { }

  // Helper to get initials for the avatar
  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }
}