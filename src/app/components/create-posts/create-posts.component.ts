import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UploadDataService } from '../../services/upload-data.service';
import { PostRequestInterface } from '../../models/post';
import { StoryRequestInterface } from '../../models/post';
@Component({
  selector: 'app-create-posts',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './create-posts.component.html',
  styleUrl: './create-posts.component.css',
})
export class CreatePostsComponent {

  uploadDataService = inject(UploadDataService)

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
    console.log(this.selectedImageUrl)

    if (!this.selectedImageUrl) {
      alert("Thius is  nulllll")
      return
    }

    const newPost: PostRequestInterface = {
      caption: this.formData.caption,
      imageUrl: this.selectedImageUrl as string
    }

    const newStory: StoryRequestInterface = {
      imageUrl: this.selectedImageUrl as string
    }

    if (this.isStory){
      this.uploadDataService.addStory(newStory).subscribe(data => {
        console.log(data)
      })
    }else {
      this.uploadDataService.addPost(newPost).subscribe(data => {
          console.log(data)
        })
    }

    this.closeOverlay()
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
