import { Component } from '@angular/core';

@Component({
  selector: 'app-create-posts',
  imports: [],
  templateUrl: './create-posts.component.html',
  styleUrl: './create-posts.component.css'
})
export class CreatePostsComponent {

  createStory(){
    console.log('I work')
  }

  createPost(){
    console.log('I work too')
  }
}
