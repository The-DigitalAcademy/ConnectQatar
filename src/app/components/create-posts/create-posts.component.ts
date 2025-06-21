import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UploadDataService } from '../../services/upload-data.service';
import { PostRequestInterface } from '../../models/post';
import { StoryRequestInterface } from '../../models/post';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: 'app-create-posts',
  imports: [CommonModule, FormsModule, HttpClientModule, LoaderComponent],
  templateUrl: './create-posts.component.html',
  styleUrl: './create-posts.component.css',
})
export class CreatePostsComponent {

  uploadDataService = inject(UploadDataService)
  snackBar = inject(MatSnackBar)

  showOverlay: boolean = false
  isStory: boolean = false
  overlayContent: string = ''
  selectedImageUrl: string | ArrayBuffer | null = null

  loading: boolean = false; 

  formData = {
    caption: '',
    image: null
  }

  createStory(){
    this.overlayContent = 'New Story'
    this.isStory = true
    this.showOverlay = true
  }

  createPost(){
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
    this.loading = false;
  }

  onSubmit() {
    if (!this.selectedImageUrl) {
      alert("Please select an image to upload.");
      return
    }

    let user = JSON.parse(localStorage.getItem('currentUser') ?? '{}');

    const newPost: PostRequestInterface = {
      userId: user.id,
      title: this.formData.caption,
      image: this.selectedImageUrl as string
    }

    const newStory: StoryRequestInterface = {
      userId: user.id,
      image: this.selectedImageUrl as string
    }

    this.loading = true; 

    if (this.isStory){
      this.uploadDataService.addStory(newStory).subscribe({
        next: (data) => {
          this.snackBar.open('Story posted successfully!', 'Close', { 
            duration: 3000,
            horizontalPosition: 'center', verticalPosition: 'top'
          });
          this.closeOverlay();
          window.location.reload(); 
        },
        error: (err) => {
          this.snackBar.open('Failed to post story.', 'Close', { 
            duration: 3000,
            horizontalPosition: 'center', verticalPosition: 'top'
          });
          this.loading = false;
        }
      });
    } else {
      this.uploadDataService.addPost(newPost).subscribe({
        next: (data) => {
          this.snackBar.open('Post created successfully!', 'Close', { 
            duration: 3000,
            horizontalPosition: 'center', verticalPosition: 'top'
          });
          this.closeOverlay();
          window.location.reload(); 
        },
        error: (err) => {
          this.snackBar.open('Failed to create post.', 'Close', { 
            duration: 3000,
            horizontalPosition: 'center', verticalPosition: 'top'
          });
          this.loading = false;
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