import { Routes } from "@angular/router";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { AdminReportsComponent } from "./admin-reports/admin-reports.component";
import { AdminSettingsComponent } from "./admin-settings/admin-settings.component";
import { CategoryManagementComponent } from "./category-management/category-management.component";
import { UserManagementComponent } from "./user-management/user-management.component";
// import {}
// import {}

export const ADMIN_ROUTES:Routes = [
    {
        path : '',component:AdminDashboardComponent
    },
    {
      path :'users' ,component:UserManagementComponent
    },
    {
        path : 'categories',component:CategoryManagementComponent
    },
    {
        path: 'reports' ,component:AdminReportsComponent
    },
    {
        path : 'settings',component:AdminSettingsComponent
    }
]