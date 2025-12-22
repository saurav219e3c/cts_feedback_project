
import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent {
  isSidebarOpen = false;

  constructor(private router: Router) {
    // Close sidebar on each route change for mobile
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => {
        if (!this.isDesktop()) {
          this.isSidebarOpen = false;
        }
      });
  }

  toggleSidebar(): void {
    if (!this.isDesktop()) {
      this.isSidebarOpen = !this.isSidebarOpen;
    }
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
  }

  @HostListener('document:keydown.escape')
  onEsc(): void {
    if (!this.isDesktop()) {
      this.isSidebarOpen = false;
    }
  }

  private isDesktop(): boolean {
    // Match the CSS breakpoint used in media query
    return window.matchMedia('(min-width: 1400px)').matches;
  }
}
