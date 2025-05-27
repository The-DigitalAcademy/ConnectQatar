import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UploadDataService } from '../../services/upload-data.service';
@Component({
  selector: 'app-create-posts',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './create-posts.component.html',
  styleUrl: './create-posts.component.css',
})
export class CreatePostsComponent {

  constructor(private uploadData: UploadDataService) {
    console.log('UploadDataService', this.uploadData)
  }

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
    console.log('form caption:', this.formData.caption);
    console.log('form data:', this.formData);
  
    if (this.selectedImageUrl) {
      console.log('Selected image base 64:', this.selectedImageUrl);
    }
  
    this.closeOverlay();
  
    if (this.isStory) {
      this.uploadData.addStory({ imageUrl: this.selectedImageUrl as string }).subscribe({
        next: (response) => {
          console.log('Story created successfully:', response);
        },
        error: (error) => {
          console.error('Error creating story:', error);
        }
      });
    } else {
      this.uploadData.addPost({ imageUrl: this.selectedImageUrl as string, caption: this.formData.caption }).subscribe({
        next: (response) => {
          console.log('Post created successfully:', response);
        },
        error: (error) => {
          console.error('Error creating post:', error);
        }
      });
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
