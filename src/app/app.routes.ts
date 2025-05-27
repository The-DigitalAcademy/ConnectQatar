import { Routes } from '@angular/router';
import { FollowingPostComponent } from './following-post/following-post.component';
import { CreatePostsComponent } from './components/create-posts/create-posts.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { UserProfileComponent } from './Pages/user-profile/user-profile.component';
import { LandingPageComponent } from './Pages/landing-page/landing-page.component';
import { EditProfileComponent } from './Pages/edit-profile/edit-profile.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
    {path: 'posts', component: FollowingPostComponent},
    {path:'',redirectTo:'/webLandingPage', pathMatch:'full'},
    {path:'appdashboard',component:AppComponent},
    {path:'login',component:LoginComponent},
    {path:'userProfile',component:UserProfileComponent},
    {path:'webLandingPage',component:LandingPageComponent},
    {path:'editProfilePage',component:EditProfileComponent},
    {path:'register',component:RegisterComponent},
    {path:'create', component:CreatePostsComponent}
];
