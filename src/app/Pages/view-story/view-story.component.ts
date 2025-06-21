import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UploadDataService } from '../../services/upload-data.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-view-story',
  standalone: true,
  imports: [CommonModule, RouterLink, HttpClientModule], 
  templateUrl: './view-story.component.html',
})
export class ViewStoryComponent implements OnInit {
  story: any;
  user: any;
  profile: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const storyId = this.route.snapshot.paramMap.get('id');

    this.http.get<any[]>('http://localhost:3000/storyUpdate').subscribe(stories => {
      this.story = stories.find(s => s.id == storyId);

      if (this.story) {
        this.http.get<any[]>('http://localhost:3000/users').subscribe(users => {
          this.user = users.find(u => u.id === this.story.userId);
        });

        this.http.get<any[]>('http://localhost:3000/profile').subscribe(profiles => {
          this.profile = profiles.find(p => p.userId === this.story.userId);
        });
      }
    });
  }
}