import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ImageServiceService, ProfileImage } from '../../services/image-service.service';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {

  url: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr3jhpAFYpzxx39DRuXIYxNPXc0zI5F6IiMQ&s';
  userId!: number;
  user: any = null;

  constructor(private imageService: ImageServiceService,private authService: AuthService) {}

  updatedUser:User ={
    fullname:'',
    username:'',
    email:'',
    password:''
  };
  ngOnInit(): void {
    const userStr = localStorage.getItem('currentUser');
    const currentUser = this.authService.getCurrentUser();

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

    if(currentUser){
      this.updatedUser ={...currentUser};
      this.userId = currentUser.id || 0;
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

  onEdit():void{
    this.authService.editUserProfile(this.updatedUser).subscribe({

      next:(updatingUser) =>{
        alert ('Profile updated successfully');
        this.updatedUser = updatingUser;
      },

      error:(err) =>{
        console.error('Update Failed: ',err);
        alert('Failed to update user profile');
      }
    });
  }
}
