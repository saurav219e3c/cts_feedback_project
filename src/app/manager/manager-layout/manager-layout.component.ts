import { Component, HostListener, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-manager-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './manager-layout.component.html',
  styleUrls: ['./manager-layout.component.css']
})
export class ManagerLayoutComponent {
  isSidebarOpen = false;
  isProfileOpen = false; // Controls the profile popup
  notificationCount = 2; // Dynamic notification number

  manager = {
    name: 'Roshan Khorate',
    email: 'roshan.khorate@example.com'
  };

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => {
        if (!this.isDesktop()) {
          this.isSidebarOpen = false;
        }
        this.isProfileOpen = false; // Close profile popup on navigation
      });
  }

  // --- Logic for Sidebar ---
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
  }

  // --- Logic for Profile Popup ---
  toggleProfile(): void {
    this.isProfileOpen = !this.isProfileOpen;
  }

  getInitials(name: string): string {
    if (!name) return '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  // --- Listeners ---
  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    // If clicking outside the profile trigger, close the popup
    if (!event.target.closest('.profile-container')) {
      this.isProfileOpen = false;
    }
  }

  @HostListener('document:keydown.escape')
  onEsc(): void {
    this.isSidebarOpen = false;
    this.isProfileOpen = false;
  }

  private isDesktop(): boolean {
    return window.matchMedia('(min-width: 1400px)').matches;
  }
}