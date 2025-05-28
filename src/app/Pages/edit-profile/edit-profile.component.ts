import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ImageServiceService, ProfileImage } from '../../services/image-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  imports: [RouterLink,CommonModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {

  url: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr3jhpAFYpzxx39DRuXIYxNPXc0zI5F6IiMQ&s';
  userId!: number;
  user: any = null;

  constructor(private imageService: ImageServiceService) {}

  ngOnInit(): void {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      const user = JSON.parse(userStr);
      this.user = user;
      this.userId = user.id || user.userId || 0;

      
      const localImage = localStorage.getItem(`profileImage_${this.userId}`);
      if (localImage) {
        this.url = localImage;
      }

     
      this.loadImage();
    } else {
      console.error('No user found in localStorage!');
    }
  }

  onSelectFile(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const base64Image = reader.result as string;
        this.url = base64Image;

        const imageData: ProfileImage = {
          userId: this.userId,
          image: base64Image,
        };

        this.imageService.uploadImage(imageData).subscribe(() => {
          
          this.saveImageToLocalStorage(this.userId, base64Image);
          this.loadImage();
        });
      };

      reader.readAsDataURL(file);
    }
  }

  loadImage(): void {
    this.imageService.getImagesByUserId(this.userId).subscribe((images) => {
      if (images.length > 0) {
        const latestImage = images[images.length - 1].image;
        this.url = latestImage;

      
        this.saveImageToLocalStorage(this.userId, latestImage);
      }
    });
  }


  saveImageToLocalStorage(userId: number, image: string): void {
    localStorage.setItem(`profileImage_${userId}`, image);
  }
}
