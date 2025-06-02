import { Routes,RouterModule } from '@angular/router';
import { FollowingPostComponent } from './following-post/following-post.component';
import { CreatePostsComponent } from './components/create-posts/create-posts.component';import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { UserProfileComponent } from './Pages/user-profile/user-profile.component';
import { LandingPageComponent } from './Pages/landing-page/landing-page.component';
import { EditProfileComponent } from './Pages/edit-profile/edit-profile.component';
import { ViewStoryComponent } from './Pages/view-story/view-story.component';
import { RegisterComponent } from './components/register/register.component';
import { SuggestedPostsComponent } from './components/suggested-posts/suggested-posts.component';
import { ChatComponent } from './Pages/chat/chat.component';
import { MessagingPageComponent } from './Pages/messaging-page/messaging-page.component';
import { ConversationsComponent } from './components/conversations/conversations.component';

export const routes: Routes = [
    {path: 'posts', component: FollowingPostComponent},
    {path: 'suggestedPosts', component:SuggestedPostsComponent},
    {path:'',redirectTo:'/webLandingPage', pathMatch:'full'},
    {path:'appdashboard',component:AppComponent},
    {path:'login',component:LoginComponent},
    {path:'userProfile',component:UserProfileComponent},
    {path:'webLandingPage',component:LandingPageComponent},
    {path:'editProfilePage',component:EditProfileComponent},
    {path:'viewStory/:id',component:ViewStoryComponent},
    {path:'register',component:RegisterComponent},
    {path:'create', component:CreatePostsComponent},
    {path: 'chat', component:ChatComponent},
    {path: 'messaging', component: MessagingPageComponent},
    {path: 'conversations', component: ConversationsComponent},
    {path: 'messages/:userId', component: MessagingPageComponent}
];

@NgModule({
  declarations: [],
  imports: [
      CommonModule,
      ReactiveFormsModule,
      FormsModule,
      RouterModule.forRoot(routes)   
  ],
  exports: [
      RouterModule  
  ]
})
export class AppRoutingModule { }
