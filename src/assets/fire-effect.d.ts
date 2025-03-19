interface Window {
  color_hover?: (event: MouseEvent) => void;
  initFireEffect?: (canvas: HTMLElement) => void;
  destroyFireEffect?: () => void;
  FireEffect?: {
    init: (canvasId: string) => void;
    colorHover: (event: MouseEvent) => void;
    destroy: () => void;
  };
}
