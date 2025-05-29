import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UploadDataService } from '../../services/upload-data.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-view-story',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './view-story.component.html',
})
export class ViewStoryComponent implements OnInit {
  story: any = null;
  sanitizedImageUrl: SafeResourceUrl | null = null;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private uploadDataService: UploadDataService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const storyId = this.route.snapshot.paramMap.get('id');
    if (storyId) {
      this.uploadDataService.getStoryById(storyId).subscribe(
        (data) => {
          this.story = data;
          this.sanitizedImageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.story.image || this.story.imageUrl);
        },
        (error) => {
          console.error('Failed getting story:', error);
          this.errorMessage = 'Unable to load the story. Please try again later.';
        }
      );
    } else {
      this.errorMessage = 'Invalid story ID.';
    }
  }
}
