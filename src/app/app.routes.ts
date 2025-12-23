import { Routes } from '@angular/router';
import { managerRoutes } from './manager/manager.routes';
export const routes: Routes = [
     {
        path:'manager',children:managerRoutes
    },
    {
        path:'',redirectTo:'manager',pathMatch:'full'
    }
];
