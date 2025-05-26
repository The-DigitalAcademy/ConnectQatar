import { Routes } from '@angular/router';
import { FollowingPostComponent } from './following-post/following-post.component';

import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { UserProfileComponent } from './Pages/user-profile/user-profile.component';

export const routes: Routes = [
    {path: 'posts', component: FollowingPostComponent},
    {path:'',redirectTo:'/appdashboard', pathMatch:'full'},
    {path:'appdashboard',component:AppComponent},
    {path:'login',component:LoginComponent},
    {path:'userProfile',component:UserProfileComponent}
];
