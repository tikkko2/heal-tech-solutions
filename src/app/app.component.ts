import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MouseFireDirective } from './shared/directives/mouse-fire.directive';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  ngOnInit() {
    // Ensure loading screen is removed
    document.body.classList.add('app-loaded');

    // Also add detection for theme preference
    const isDarkMode =
      localStorage.getItem('preferredTheme') === 'dark' ||
      (window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}
