import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Required for [(ngModel)]

@Component({
  selector: 'app-manager-profile',
  standalone: true,
  // Added CommonModule for *ngIf and FormsModule for input binding
  imports: [RouterLink, CommonModule, FormsModule], 
  templateUrl: './manager-profile.component.html',
  styleUrl: './manager-profile.component.css'
})
export class ManagerProfileComponent {
  // Flag to toggle between view and edit mode
  isEditing = false;

  manager = {
    id: 'MGR123',
    name: 'Roshan Khorate',
    email: 'roshan.khorate@example.com',
    phone: '+91 9876543210',      
    department: 'IT Operations',  
    location: 'Pune, India',    
    joinDate: '2023-05-15'     
  };

  getInitials(name: string): string {
    if (!name) return '';
    return name
      .split(' ')
      .map(part => part.charAt(0).toUpperCase())
      .join('');
  }

  // Toggle editing mode
  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  // Save logic (for now, just logs the updated data, can be extended to call a service)
  saveChanges() {
    console.log('Updated Manager Data:', this.manager);
    this.isEditing = false;
  }
}