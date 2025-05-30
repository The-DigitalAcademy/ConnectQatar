import { Component } from '@angular/core';
import { UserProfleButtonsComponent } from '../../components/user-profle-buttons/user-profle-buttons.component';
import { UserProflePostsComponent } from '../../components/user-profle-posts/user-profle-posts.component';
import { UserpHeaderComponent } from '../../components/userp-header/userp-header.component';
import { BottomNavComponent } from '../../components/bottom-nav/bottom-nav.component';
import { RouterLink } from '@angular/router';
import { PostCardComponent } from "../../components/post-card/post-card.component";

@Component({
  selector: 'app-user-profile',
  imports: [UserProfleButtonsComponent, UserpHeaderComponent, BottomNavComponent, PostCardComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

}
