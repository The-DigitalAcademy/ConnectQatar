import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadDataService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  addPost(post: {
    imageUrl: string;
    caption: string;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/posts`, post);
  }

  addStory(story: {
    imageUrl: string;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/stories`, story);
  }
}
