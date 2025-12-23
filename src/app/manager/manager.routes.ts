import { Component } from "@angular/core";
import { Route, Routes } from "@angular/router";
import { ManagerLayoutComponent } from "./manager-layout/manager-layout.component";
import { ManagerDashboardComponent } from "./manager-dashboard/manager-dashboard.component";
import { ManagerAnalyticsComponent } from "./manager-analytics/manager-analytics.component";
import { ManagerFeedbackComponent } from "./manager-feedback/manager-feedback.component";
import { ManagerProfileComponent } from "./manager-profile/manager-profile.component";
import { ManagerNotificationComponent } from "./manager-notification/manager-notification.component";

export const managerRoutes :Routes = [{
  
    path:'',
    component:ManagerLayoutComponent,
    children:[{

        path:'',
        component:ManagerDashboardComponent},
        {
            path:'analytics',
            component:ManagerAnalyticsComponent
        },
        {
            path:'feedback',
            component:ManagerFeedbackComponent
        },
        {
            path:'profile',
            component:ManagerProfileComponent
        },
        {
            path:'notifications',
            component:ManagerNotificationComponent
        }
    ]

}

];