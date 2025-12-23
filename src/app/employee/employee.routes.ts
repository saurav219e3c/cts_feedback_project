import { Route, Routes } from "@angular/router";
import { EmployeeComponent } from "./employee.component";
import { EmployeeDashboardComponent } from "./employee-dashboard/employee-dashboard.component";

export const EMPLOYEE_ROUTES: Routes=[
    {path:'',
     component:EmployeeComponent,
     children:[
        {path:'dashboard',
            component:EmployeeDashboardComponent
        }
     ]
    }
];