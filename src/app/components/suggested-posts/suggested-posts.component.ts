import { Component } from '@angular/core';
import { PostTypeComponent } from "../post-type/post-type.component";
import { BottomNavComponent } from "../bottom-nav/bottom-nav.component";
import { PostCardComponent } from "../post-card/post-card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-suggested-posts',
  imports: [PostTypeComponent, BottomNavComponent, PostCardComponent, CommonModule],
  templateUrl: './suggested-posts.component.html',
  styles: ``
})
export class SuggestedPostsComponent {

}
