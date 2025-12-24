import { Routes } from "@angular/router";
import { SubmitFeedbackComponent } from "../submit-feedback/submit-feedback.component";
import { EmployeeDashboardComponent } from "./employee-dashboard.component";

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: EmployeeDashboardComponent,
    children: [

      { path: 'submit-feedback', component: SubmitFeedbackComponent} // Only one entry needed here
    ]
  }
];