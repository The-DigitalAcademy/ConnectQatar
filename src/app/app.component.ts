import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FollowingPostComponent } from "./following-post/following-post.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'qatarconnect';
}
