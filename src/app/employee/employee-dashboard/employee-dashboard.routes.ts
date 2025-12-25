import { Routes } from "@angular/router";
import { SubmitFeedbackComponent } from "../submit-feedback/submit-feedback.component";
import { EmployeeDashboardComponent } from "./employee-dashboard.component";
import { EmployeeRecognitionComponent } from "../employee-recognition/employee-recognition.component";

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: EmployeeDashboardComponent,
    children: [

      { path: 'submit-feedback', component: SubmitFeedbackComponent},
      {path:'recognization',component:EmployeeRecognitionComponent} // Only one entry needed here
    ]
  }
];