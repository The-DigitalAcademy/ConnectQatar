import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {path:'',redirectTo:'/appdashboard', pathMatch:'full'},
    {path:'appdashboard',component:AppComponent},
    {path:'login',component:LoginComponent}
];
