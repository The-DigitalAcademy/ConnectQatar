import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostRequestInterface } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class UploadDataService {
  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  addPost(post: PostRequestInterface) {
    return this.http.post(`${this.baseUrl}/posts`, post);
  }

  addStory(story: { imageUrl: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/storyUpdate`, story);
  }
}
