import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
 
@Component({
  standalone: true,
  selector: 'app-user-management',
  imports: [CommonModule],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent {
  users = [
    { id: 101, name: 'Gaurav Singh', role: 'Admin', feedback: 12, recognition: 5 },
    { id: 102, name: 'Amit Kumar', role: 'Employee', feedback: 8, recognition: 3 },
    { id: 103, name: 'Ravi Sharma', role: 'Manager', feedback: 15, recognition: 7 },
    { id: 104, name: 'Neha Verma', role: 'Employee', feedback: 6, recognition: 2 },
    { id: 105, name: 'Karan Patel', role: 'Employee', feedback: 9, recognition: 4 }
  ];
}