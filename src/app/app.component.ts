import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeComponent } from "../employee/employee.component";
import { EmployeeLayoutComponent } from '../employee/employee-layout/employee-layout.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EmployeeLayoutComponent,EmployeeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'feedback_project';
}
