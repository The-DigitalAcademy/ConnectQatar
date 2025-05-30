import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'
import { CreateOverlayService } from './services/create-overlay.service';
import { CreatePostsComponent } from "./components/create-posts/create-posts.component";
import { DesktopMessageComponent } from './components/desktop-message/desktop-message.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, CreatePostsComponent, DesktopMessageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  showCreateOverlay: boolean = false;
  isMobileView: boolean = true;

  constructor(private overlayService: CreateOverlayService) {}

  ngOnInit(): void {
    this.overlayService.overlayState$.subscribe((state) => {
      this.showCreateOverlay = state;
    });

    this.checkViewport();
    window.addEventListener('resize', this.checkViewport.bind(this));
  }

  checkViewport() {
    this.isMobileView = window.innerWidth <= 840;
  }

  closeCreateOverlay(): void {
    this.overlayService.closeOverlay();
  }
}