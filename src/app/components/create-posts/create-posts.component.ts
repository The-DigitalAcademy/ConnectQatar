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

  formData = {
    caption: '',
    image: null
  }

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
    this.formData = {
      caption: '', 
      image: null
    }
    this.selectedImageUrl = null
  }

  onSubmit() {
    console.log('Form submitted');
    console.log('form caption:', this.formData.caption)
    console.log('form data:', this.formData)

    if(this.selectedImageUrl){
      console.log('selected image base 64:', this.selectedImageUrl)
    }
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
