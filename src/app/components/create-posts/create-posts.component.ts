import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-create-posts',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-posts.component.html',
  styleUrl: './create-posts.component.css'
})
export class CreatePostsComponent {
  showOverlay: boolean = false
  isStory: boolean = false
  overlayContent: string = ''
  selectedImageUrl: string | ArrayBuffer | null = null

  createStory(){
    console.log('I work')
    this.overlayContent = 'New Story'
    this.isStory = true
    this.showOverlay = true
  }

  createPost(){
    console.log('I work too')
    this.overlayContent = 'New Post'
    this.isStory = false
    this.showOverlay = true
  }

  closeOverlay(){
    this.showOverlay = false;
    this.overlayContent = '';
  }

  onSubmit() {
    console.log('Form submitted');
    this.closeOverlay();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
