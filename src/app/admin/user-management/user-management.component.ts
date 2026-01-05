
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  standalone: true,
  selector: 'app-user-management',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent {
  users = [
    { id: 101, name: 'Gaurav Singh', role: 'Admin',    feedback: 12, recognition: 5 },
    { id: 102, name: 'Amit Kumar',   role: 'Employee', feedback: 8,  recognition: 3 },
    { id: 103, name: 'Ravi Sharma',  role: 'Manager',  feedback: 15, recognition: 7 },
    { id: 104, name: 'Neha Verma',   role: 'Employee', feedback: 6,  recognition: 2 },
    { id: 105, name: 'Karan Patel',  role: 'Employee', feedback: 9,  recognition: 4 },
    { id: 106, name: 'sam Patel',  role: 'Employee', feedback: 9,  recognition: 4 },
    { id: 107, name: 'ram Patel',  role: 'Employee', feedback: 9,  recognition: 4 },
    { id: 108, name: 'tam Patel',  role: 'Employee', feedback: 9,  recognition: 4 },
    { id: 109, name: 'tam Patel',  role: 'Employee', feedback: 9,  recognition: 4 },
    { id: 110, name: 'gm Patel',  role: 'Employee', feedback: 9,  recognition: 4 },
    { id: 111, name: 'city Patel',  role: 'Employee', feedback: 9,  recognition: 4 },
    { id: 112, name: 'somu Patel',  role: 'Employee', feedback: 9,  recognition: 4 },
  ];

  
  searchTerm = '';

 
  get filteredUsers() {
    const q = this.searchTerm.trim().toLowerCase();
    if (!q) return this.users;

    return this.users.filter(u => {
      const name = (u.name ?? '').toLowerCase();
      const role = (u.role ?? '').toLowerCase();
      const idStr = String(u.id ?? '').toLowerCase();

      
      return name.includes(q) || role.includes(q) || idStr.includes(q);
    });
  }

  onSearchChange(): void {
    
  }

  clearSearch(): void {
    this.searchTerm = '';
  }
}

