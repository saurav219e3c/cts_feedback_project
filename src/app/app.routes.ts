import { Routes } from '@angular/router';
import { EmployeeDashboardComponent } from './employee/employee-dashboard/employee-dashboard.component';
import { EMPLOYEE_ROUTES } from './employee/employee.routes';


export const routes: Routes = [
    {
        path:'employee',
        children:EMPLOYEE_ROUTES
    },
    {
        path:'',
        redirectTo:'employee',
        pathMatch:'full'
    }

    

];
