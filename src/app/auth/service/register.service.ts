import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private STORAGE_KEY = 'feedback_project_users';

  getUsers(): any[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  registerUser(userData: any): Observable<boolean> {
    const users = this.getUsers();
    
    // Check if User ID already exists
    if (users.find((u: any) => u.userId === userData.userId)) {
      return of(false);
    }

    users.push(userData);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
    return of(true);
  }
}