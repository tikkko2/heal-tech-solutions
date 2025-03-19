import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { ParticlesComponent } from '../../shared/particles/particles.component';

@Component({
  selector: 'app-landing',
  imports: [CommonModule, ParticlesComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {
  isMobileMenuOpen = false;
  isScrolled = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    this.isScrolled = scrollPosition > 0; // Add shadow if scrolled
  }
}
