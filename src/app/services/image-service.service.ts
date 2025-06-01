// image-service.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ProfileImage {
  id?: number;
  userId: number;      // add userId here
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class ImageServiceService {
  private apiUrl = 'http://localhost:3000/profileImage';

  constructor(private http: HttpClient) {}

  uploadImage(data: ProfileImage): Observable<ProfileImage> {
    return this.http.post<ProfileImage>(this.apiUrl, data);
  }

  
  getImagesByUserId(userId: number): Observable<ProfileImage[]> {
    return this.http.get<ProfileImage[]>(`${this.apiUrl}?userId=${userId}`);
  }
}

