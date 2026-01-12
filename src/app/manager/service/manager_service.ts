import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Feedback } from './manager-feedback';

@Injectable({ providedIn: 'root' })
export class FeedbackService {
  private mockData: Feedback[] = [
    { id: 1, employeeName: 'Emma Wilson', category: 'Work Culture', date: new Date('2025-12-15'), status: 'Pending', comment: 'Team building activities are great.', priority: 'Low' },
    { id: 2, employeeName: 'Liam Neeson', category: 'Technical', date: new Date('2025-12-22'), status: 'Acknowledged', comment: 'Laptop is overheating during builds.', priority: 'High' },
    { id: 3, employeeName: 'Sarah Connor', category: 'Management', date: new Date('2025-12-24'), status: 'Pending', comment: 'Need more clarity on Q1 goals.', priority: 'Medium' }
  ];

  private feedbackSubject = new BehaviorSubject<Feedback[]>(this.mockData);

  getFeedback(): Observable<Feedback[]> {
    return this.feedbackSubject.asObservable();
  }

  updateStatus(id: number, newStatus: 'Acknowledged' | 'Resolved'): void {
    const currentData = this.feedbackSubject.value;
    const index = currentData.findIndex(f => f.id === id);
    if (index !== -1) {
      currentData[index].status = newStatus;
      this.feedbackSubject.next([...currentData]); 
    }
  }
}