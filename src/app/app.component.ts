import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'
import { CreateOverlayService } from './services/create-overlay.service';
import { CreatePostsComponent } from "./components/create-posts/create-posts.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, CreatePostsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  showCreateOverlay: boolean = false;

  constructor(private overlayService: CreateOverlayService) {}

  ngOnInit(): void {
    this.overlayService.overlayState$.subscribe((state) => {
      this.showCreateOverlay = state;
    });
  }

  closeCreateOverlay(): void {
    this.overlayService.closeOverlay();
  }
}
