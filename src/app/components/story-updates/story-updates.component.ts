import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { UploadDataService } from '../../services/upload-data.service';
import { StoryRequestInterface } from '../../models/post';

@Component({
  selector: 'app-story-updates',
  imports: [RouterLink, FormsModule, CommonModule, HttpClientModule],
  templateUrl: './story-updates.component.html',
  styles: ``
})
export class StoryUpdatesComponent {

  uploadDataService = inject(UploadDataService)

  formData = {
    caption: '',
    image: null
  }

  showOverlay: boolean = false
  isStory: boolean = false
  overlayContent: string = ''
  selectedImageUrl: string | ArrayBuffer | null = null

  createStory(){
    console.log('i work')
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
      console.log(this.selectedImageUrl)
  
      if (!this.selectedImageUrl) {
        alert("Thius is  nulllll")
        return
      }

      const newStory: StoryRequestInterface = {
        imageUrl: this.selectedImageUrl as string
      }
  
      if (this.isStory){
        this.uploadDataService.addStory(newStory).subscribe(data => {
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
