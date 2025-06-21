import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-post-type',
  imports: [RouterLink, CommonModule, RouterLinkActive],
  templateUrl: './post-type.component.html',
  styles: `
  
  .active {
    background-color: blue;
  }
  `
})
export class PostTypeComponent {
  activeTab: 'following' | 'suggested' = 'following';

  get isFollowingActive() {
    return this.activeTab === 'following';
  }

  get isSuggestedActive() {
    return this.activeTab === 'suggested';
  }

  setActive(tab: 'following' | 'suggested') {
    this.activeTab = tab;
  }
}
