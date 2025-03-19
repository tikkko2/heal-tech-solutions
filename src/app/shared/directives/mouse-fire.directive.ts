// mouse-fire.directive.ts
import {
  Directive,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appMouseFire]',
  standalone: true,
})
export class MouseFireDirective implements OnInit, OnDestroy {
  private mouseX = 0;
  private mouseY = 0;
  private container: HTMLElement | null = null;
  private animationFrameId: number | null = null;
  private isActive = true;
  private colors: string[] = [
    '#d9d9d9',
    '#e6e6e6',
    '#f2f2f2',
    '#cccccc',
    '#bfbfbf',
  ];

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    // Create a container for the fire particles
    this.container = this.renderer.createElement('div');
    this.renderer.setStyle(this.container, 'position', 'fixed');
    this.renderer.setStyle(this.container, 'top', '0');
    this.renderer.setStyle(this.container, 'left', '0');
    this.renderer.setStyle(this.container, 'width', '100%');
    this.renderer.setStyle(this.container, 'height', '100%');
    this.renderer.setStyle(this.container, 'pointer-events', 'none');
    this.renderer.setStyle(this.container, 'z-index', '9999');
    this.renderer.appendChild(document.body, this.container);

    // Track mouse position for knowing where to create particles
    this.ngZone.runOutsideAngular(() => {
      document.addEventListener(
        'mousemove',
        this.trackMousePosition.bind(this)
      );
      // Add click event listener instead of creating particles on mouse move
      document.addEventListener('mousedown', this.onMouseClick.bind(this));
    });
  }

  ngOnDestroy(): void {
    this.isActive = false;
    document.removeEventListener(
      'mousemove',
      this.trackMousePosition.bind(this)
    );
    document.removeEventListener('mousedown', this.onMouseClick.bind(this));

    if (this.container && document.body.contains(this.container)) {
      this.renderer.removeChild(document.body, this.container);
    }
  }

  // This just tracks the mouse position without creating particles
  private trackMousePosition(event: MouseEvent): void {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }

  // Create particles on mouse click
  private onMouseClick(event: MouseEvent): void {
    if (!this.isActive) return;

    // Create a burst of particles on click
    for (let i = 0; i < 20; i++) {
      this.createFireParticle();
    }
  }

  // This method is no longer needed since we create particles directly on mouse move
  // private startFireEffect(): void {
  //   if (!this.isActive || !this.container) {
  //     return;
  //   }
  //
  //   // Create fire particles
  //   this.createFireParticle();
  //
  //   // Continue the animation loop
  //   this.animationFrameId = requestAnimationFrame(() => this.startFireEffect());
  // }

  private createFireParticle(): void {
    if (!this.container) return;

    // Create multiple particles per frame for a more intense effect
    for (let i = 0; i < 5; i++) {
      // Create a particle element
      const particle = this.renderer.createElement('div');

      // Random size between 8 and 20px for larger, more visible particles
      const size = 8 + Math.random() * 12;

      // Random offset from cursor position
      const offsetX = (Math.random() - 0.5) * 30;
      const offsetY = (Math.random() - 0.5) * 30;

      // Random color from the colors array
      const color = this.colors[Math.floor(Math.random() * this.colors.length)];

      // Set particle styles
      this.renderer.setStyle(particle, 'position', 'absolute');
      this.renderer.setStyle(particle, 'width', `${size}px`);
      this.renderer.setStyle(particle, 'height', `${size}px`);
      this.renderer.setStyle(particle, 'background-color', color);
      this.renderer.setStyle(particle, 'border-radius', '50%');
      this.renderer.setStyle(particle, 'left', `${this.mouseX + offsetX}px`);
      this.renderer.setStyle(particle, 'top', `${this.mouseY + offsetY}px`);
      this.renderer.setStyle(particle, 'pointer-events', 'none');
      this.renderer.setStyle(particle, 'filter', 'blur(4px)');
      this.renderer.setStyle(particle, 'box-shadow', `0 0 8px 2px ${color}`);

      // Add the particle to the container
      this.renderer.appendChild(this.container, particle);

      // Animate the particle
      this.animateParticle(particle);
    }
  }

  private animateParticle(particle: HTMLElement): void {
    if (!this.container) return;

    let opacity = 1;
    let posY = parseFloat(particle.style.top);
    const duration = 1500; // Longer animation duration in milliseconds
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / duration;

      if (progress >= 1 || !this.isActive) {
        if (this.container && this.container.contains(particle)) {
          this.renderer.removeChild(this.container, particle);
        }
        return;
      }

      // Update opacity
      opacity = 1 - progress;
      this.renderer.setStyle(particle, 'opacity', opacity.toString());

      // Move particle upward more slowly
      posY -= 0.7;
      this.renderer.setStyle(particle, 'top', `${posY}px`);

      // Increase blur as the particle fades
      const blurAmount = 4 + progress * 6; // Blur increases from 4px to 10px
      this.renderer.setStyle(particle, 'filter', `blur(${blurAmount}px)`);

      // Add some random horizontal movement
      const posX = parseFloat(particle.style.left);
      const randomX = (Math.random() - 0.5) * 2;
      this.renderer.setStyle(particle, 'left', `${posX + randomX}px`);

      // Continue animation
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }
}
