import { Component } from '@angular/core';

@Component({
  selector: 'app-employee-dashboard',
  imports: [],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.css'
})
export class EmployeeDashboardComponent {
  feedbackGiven=12;
  feedbackReceived=8;
  recognitionPoints=150;
  notifications=3;


}
