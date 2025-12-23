
import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-manager-layout',
  standalone: true, // ✅ required for standalone components
  imports: [
    CommonModule,
    RouterOutlet,      // ✅ needed if your template uses <router-outlet>
    RouterLink,        // ✅ needed if your template uses routerLink on <a> or <button>
    RouterLinkActive,  // ✅ needed if your template uses routerLinkActive
  ],
  templateUrl: './manager-layout.component.html',
  styleUrls: ['./manager-layout.component.css'] // ✅ use plural + array
})
export class ManagerLayoutComponent {
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
    // Optional: only toggle on mobile; keep persistent on desktop
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
    // Match the CSS breakpoint used in your media query
    return window.matchMedia('(min-width: 1400px)').matches;
  }
}
