import { Component } from '@angular/core';
import { routes } from '../app.routes';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { BottomNavComponent } from '../components/bottom-nav/bottom-nav.component';
import { StoryUpdatesComponent } from "../components/story-updates/story-updates.component";
import { CommonModule } from '@angular/common';
import { PostTypeComponent } from "../components/post-type/post-type.component";
import { FeedComponent } from "../Pages/feed/feed.component";

@Component({
  selector: 'app-following-post',
  imports: [BottomNavComponent, StoryUpdatesComponent, CommonModule, PostTypeComponent, FeedComponent],
  templateUrl: './following-post.component.html',
})
export class FollowingPostComponent {


}
