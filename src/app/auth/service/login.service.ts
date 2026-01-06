// src/app/auth/service/login.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private STORAGE_KEY = 'feedback_project_users';

  // src/app/auth/service/login.service.ts

constructor() {
  const data = localStorage.getItem(this.STORAGE_KEY);
  if (!data) {
    const defaultAdmin = [{
      username: 'adm1234',      // Changed from userId to username to match your login form
      name: 'System Admin',
      password: 'Admin@123', 
      role: 'admin',
      department: 'IT'
    }];
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(defaultAdmin));
  }
}

// src/app/auth/service/login.service.ts

login(credentials: any): Observable<any | null> {
  const data = localStorage.getItem(this.STORAGE_KEY);
  const users = data ? JSON.parse(data) : [];

  const foundUser = users.find((u: any) => 
    // FIX: Change u.username to u.userId to match your registration data
    (u.userId === credentials.username || u.username === credentials.username) && 
    u.password === credentials.password &&
    u.role === credentials.role
  );

  return of(foundUser || null);
}

}