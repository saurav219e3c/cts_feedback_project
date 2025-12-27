import { Component, signal } from '@angular/core';
interface Feedback {
  id: string;
  employeeName: string;
  category: string;
  comment: string;
  date: string;
  isAnonymous: boolean;
}

@Component({
  selector: 'app-employee-feedback',
  imports: [],
  templateUrl: './employee-feedback.component.html',
  styleUrl: './employee-feedback.component.css'
})


export class EmployeeFeedbackComponent {

  // Using Signals (Angular 17/18/19 feature)
  feedbackList = signal<Feedback[]>([
    { id: 'EMP-101', employeeName: 'John Doe', category: 'Culture', comment: 'Great team bonding last Friday!', date: '2025-12-20', isAnonymous: false },
    { id: 'HIDDEN', employeeName: 'Anonymous', category: 'Management', comment: 'Need more clarity on the new project goals.', date: '2025-12-21', isAnonymous: true },
    { id: 'EMP-305', employeeName: 'Sarah Connor', category: 'Facilities', comment: 'The coffee machine in block B is broken.', date: '2025-12-22', isAnonymous: false },
  ]);

  deleteFeedback(index: number) {
    const current = this.feedbackList();
    current.splice(index, 1);
    this.feedbackList.set([...current]);
  }

  

}
