import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../../services/auth.service';
import { UserProfleButtonsComponent } from '../../components/user-profle-buttons/user-profle-buttons.component';
import { UserpHeaderComponent } from '../../components/userp-header/userp-header.component';
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav.component';
import { CommonModule } from '@angular/common';
import { UserPostsComponent } from '../../components/user-posts/user-posts.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    UserProfleButtonsComponent,
    UserpHeaderComponent,
    BottomNavComponent,
    CommonModule,
    UserPostsComponent
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent{
  currentUser: User | null = null;
  postsForUser: any[] = [];

  constructor(
    private authService: AuthService,

  ) {}
}
