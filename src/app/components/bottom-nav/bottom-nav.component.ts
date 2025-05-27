import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CreateOverlayService } from '../../services/create-overlay.service';

@Component({
  selector: 'app-bottom-nav',
  imports: [ RouterLink],
  templateUrl: './bottom-nav.component.html',
})
export class BottomNavComponent {
  constructor(public createOverlayService: CreateOverlayService) { }

  openOverlay(): void {
    console.log('Opening overlay');
    this.createOverlayService.openOverlay();
  }

  closeOverlay(): void {
    this.createOverlayService.closeOverlay();
  }

}
