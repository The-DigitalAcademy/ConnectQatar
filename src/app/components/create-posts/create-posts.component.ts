import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-posts',
  imports: [CommonModule],
  templateUrl: './create-posts.component.html',
  styleUrl: './create-posts.component.css'
})
export class CreatePostsComponent {
  showOverlay: boolean = false
  overlayContent: string = ''

  createStory(){
    console.log('I work')
    this.overlayContent = 'New Story'
    this.showOverlay = true
  }

  createPost(){
    console.log('I work too')
    this.overlayContent = 'New Post'
    this.showOverlay = true
  }

  closeOverlay(){
    this.showOverlay = false;
    this.overlayContent = '';
  }
}
