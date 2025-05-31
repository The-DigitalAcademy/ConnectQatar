import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UserProfileDataComponent } from "../user-profile-data/user-profile-data.component";

@Component({
  selector: 'app-userp-header',
  imports: [CommonModule, UserProfileDataComponent],
  templateUrl: './userp-header.component.html',
  styleUrl: './userp-header.component.css'
})
export class UserpHeaderComponent {

  authService =inject(AuthService);

  url: string = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr3jhpAFYpzxx39DRuXIYxNPXc0zI5F6IiMQ&s'; 
  user: any = null;

  ngOnInit(): void {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      const user = JSON.parse(userStr);
      this.user = user;
      const userId = user.id || user.userId;
      const storedImage = localStorage.getItem(`profileImage_${userId}`);
      if (storedImage) {
        this.url = storedImage;
      }
    }
  }

  onLogOut():void{
    this.authService.logout();
  }
}
