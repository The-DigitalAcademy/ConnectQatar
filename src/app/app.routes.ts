import { Routes } from '@angular/router';
import { ViewPostsComponent } from './view-posts/view-posts.component';

export const routes: Routes = [
    { path: '**', redirectTo: 'user', pathMatch: 'full' },
    {path: 'user', component: ViewPostsComponent}
];
