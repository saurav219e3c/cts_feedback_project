import { CommonModule } from '@angular/common';
import { Component, HostListener, signal, ElementRef } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-employee-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './employee-layout.component.html',
  styleUrl: './employee-layout.component.css'
})
export class EmployeeLayoutComponent {
  // Using Signals for Angular 19 state management
  isSidebarOpen = signal(false);
  isProfileOpen = signal(false);
  
  constructor(private router: Router, private eRef: ElementRef) {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => {
        if (!this.isDesktop()) {
          this.isSidebarOpen.set(false);
        }
        this.isProfileOpen.set(false); // Close dropdown on navigation
      });
  }

  toggleSidebar(): void {
    this.isSidebarOpen.update(v => !v);
  }

  toggleProfile(): void {
    this.isProfileOpen.update(v => !v);
  }

  // Close dropdown if clicking outside
  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isProfileOpen.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  onEsc(): void {
    this.isSidebarOpen.set(false);
    this.isProfileOpen.set(false);
  }

  private isDesktop(): boolean {
    return window.matchMedia('(min-width: 1400px)').matches;
  }

  onLogout(): void {
    console.log("Logging out...");
    // this.authService.logout();
    this.router.navigate(['/login']);
  }
}