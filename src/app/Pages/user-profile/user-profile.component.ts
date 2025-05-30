import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../../services/auth.service';
import { PostService } from '../../services/post.service';
import { UserProfleButtonsComponent } from '../../components/user-profle-buttons/user-profle-buttons.component';
import { UserpHeaderComponent } from '../../components/userp-header/userp-header.component';
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav.component';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    UserProfleButtonsComponent,
    UserpHeaderComponent,
    BottomNavComponent,
    PostCardComponent,CommonModule
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  currentUser: User | null = null;
  postsForUser: any[] = [];

  constructor(
    private authService: AuthService,
    private postService: PostService
  ) {}

ngOnInit() {
  this.postService.getPostsOfCurrentUser().subscribe(posts => {
    this.postsForUser = posts;
  });
}


}
