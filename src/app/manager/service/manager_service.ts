import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  private storageKey = 'feedback_db';

  getAllFeedback(): any[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  updateFeedbackStatus(id: any, newStatus: string): void {
    const feedbacks = this.getAllFeedback();
    const index = feedbacks.findIndex(f => f.id === id || f.feedbackId === id);

    if (index !== -1) {
      feedbacks[index].status = newStatus;
      localStorage.setItem(this.storageKey, JSON.stringify(feedbacks));
    }
  }
}