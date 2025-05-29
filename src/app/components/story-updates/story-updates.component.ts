import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { UploadDataService } from '../../services/upload-data.service';
import { StoryRequestInterface } from '../../models/post';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-story-updates',
  imports: [RouterLink, FormsModule, CommonModule, HttpClientModule],
  templateUrl: './story-updates.component.html',
  styles: ``
})
export class StoryUpdatesComponent implements OnInit {

  uploadDataService = inject(UploadDataService)
  snackBar = inject(MatSnackBar)

  formData = {
    caption: '',
    image: null
  }

  showOverlay: boolean = false
  isStory: boolean = false
  overlayContent: string = ''
  selectedImageUrl: string | ArrayBuffer | null = null

  stories: any[] = [];
  selectedProfileId: string = '3'; // Set this dynamically as needed

  ngOnInit() {
    this.loadStoriesForProfile(this.selectedProfileId);
  }

  loadStoriesForProfile(profileId: string) {
    this.uploadDataService.getStoriesByProfileId(profileId).subscribe(
      (data) => {
        this.stories = data;
      },
      (error) => {
        console.error('Error fetching stories:', error);
      }
    );
  }

  createStory(){
    this.overlayContent = 'New story'
    this.isStory = true
    this.showOverlay = true
  }

  closeOverlay(){
    this.showOverlay  = false
    this.overlayContent = ''
    this.selectedImageUrl = null
  }

  onSubmit() {
    if (!this.selectedImageUrl) {
      alert("Image is required")
      return
    }
      console.log(this.selectedImageUrl)

      let user = JSON.parse(localStorage.getItem('currentUser') ?? '{}');

      const newStory: StoryRequestInterface = {
        userId: user.id, 
        imageUrl: this.selectedImageUrl as string
      }
  
      if (this.isStory){
        this.uploadDataService.addStory(newStory).subscribe(data => {
          this.snackBar.open('Story posted successfully!', 'Close', { 
            duration: 3000,
            horizontalPosition: 'center', verticalPosition: 'top'
           });
          console.log(data)
        })
  
      this.closeOverlay()
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