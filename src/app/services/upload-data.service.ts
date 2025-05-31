import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostRequestInterface } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class UploadDataService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  addPost(post: PostRequestInterface) {
    return this.http.post(`${this.baseUrl}/posts`, post);
  }

  getStoryById(id: string): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/storyUpdate/${id}`);
}

  getStoriesByProfileId(profileId: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/storyUpdate?profileId=${profileId}`);
}

  addStory(story: { userId: string, image: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/storyUpdate`, story);
  }
}
