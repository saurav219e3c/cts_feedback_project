import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-employee-layout',
  imports: [RouterModule,RouterOutlet,CommonModule],
  templateUrl: './employee-layout.component.html',
  styleUrl: './employee-layout.component.css'
})
export class EmployeeLayoutComponent {
  isSidebarOpen = false;
  isProfileOpen = false;

  // Dummy Data
  userName: string = 'Tejas Thorat';
  userEmail: string = 'tejas.k@company.com';
  employeeId: string = '2463723';

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleProfile(event: Event): void {
    event.stopPropagation(); // Prevents document click from closing it immediately
    this.isProfileOpen = !this.isProfileOpen;
  }

  onNavClick(): void {
    // Unconditionally close the sidebar (works on Desktop & Mobile)
    this.isSidebarOpen = false;
  }

  // Closes dropdown when clicking anywhere else
  @HostListener('document:click', ['$event'])
  closeProfile() {
    this.isProfileOpen = false;
  }

  getInitials(name: string): string {
    if (!name) return '??';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }

  logout(): void {
    alert('Logging out...');
  }

}
