import { Component } from '@angular/core';
import { routes } from '../app.routes';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { BottomNavComponent } from '../components/bottom-nav/bottom-nav.component';
import { PostCardComponent } from "../components/post-card/post-card.component";
import { StoryUpdatesComponent } from "../components/story-updates/story-updates.component";
import { CommonModule } from '@angular/common';
import { PostTypeComponent } from "../components/post-type/post-type.component";

@Component({
  selector: 'app-following-post',
  imports: [BottomNavComponent, PostCardComponent, StoryUpdatesComponent, CommonModule, PostTypeComponent],
  templateUrl: './following-post.component.html',
})
export class FollowingPostComponent {


}
