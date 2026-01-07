
import { bootstrapApplication } from '@angular/platform-browser';
// import { provideRouter } from '@angular/platform-browser'; // Ensure this is @angular/router if using standard routing
import { provideRouter as provideNgRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes'; // Changed from APP_ROUTES to routes

bootstrapApplication(AppComponent, {
  providers: [
    provideNgRouter(routes), // Use the new merged 'routes' constant
  ],
}).catch(err => console.error(err));