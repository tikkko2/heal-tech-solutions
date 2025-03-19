import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MouseFireDirective } from './shared/directives/mouse-fire.directive';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
