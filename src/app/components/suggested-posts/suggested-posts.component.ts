import { Component } from '@angular/core';
import { PostTypeComponent } from "../post-type/post-type.component";
import { BottomNavComponent } from "../bottom-nav/bottom-nav.component";
import { CommonModule } from '@angular/common';
import { SuggestedPostCardComponent } from "../suggested-post-card/suggested-post-card.component";

@Component({
  selector: 'app-suggested-posts',
  imports: [PostTypeComponent, BottomNavComponent, CommonModule, SuggestedPostCardComponent],
  templateUrl: './suggested-posts.component.html',
})
export class SuggestedPostsComponent {

}
