import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateOverlayService {
  private overlayState = new BehaviorSubject<boolean>(false)
  overlayState$ = this.overlayState.asObservable()

  openOverlay(): void {
    this.overlayState.next(true);
  }

  closeOverlay(): void {
    this.overlayState.next(false);
  }

}
