import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FireEffectService {
  private renderer: Renderer2;
  private isInitialized = false;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  initialize() {
    if (this.isInitialized) {
      return;
    }

    // Wait for DOM to be fully loaded
    if (document.readyState === 'complete') {
      this.initFireEffect();
    } else {
      window.addEventListener('load', () => {
        this.initFireEffect();
      });
    }
  }

  private initFireEffect() {
    // Get the canvas element
    const canvas = document.getElementById('canvas_banner');

    if (canvas) {
      // If your fire effect requires specific initialization after
      // the script loads, call that function here
      if (window['initFireEffect']) {
        window['initFireEffect'](canvas);
      }

      this.isInitialized = true;
    }
  }

  destroy() {
    // Clean up any global resources or event listeners
    if (window['destroyFireEffect']) {
      window['destroyFireEffect']();
    }

    this.isInitialized = false;
  }
}
