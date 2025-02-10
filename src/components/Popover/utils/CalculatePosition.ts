import type { Placement } from '../types/Placement';
import type { Position } from '../types/Position';

export const calculatePosition = (
  triggerRect: DOMRect,
  contentRect: DOMRect,
  placement: Placement,
): Position => {
  let top = 0;
  let left = 0;

  // Posicionamiento vertical (top/bottom)
  if (placement.startsWith('top')) {
    top = triggerRect.top - contentRect.height - 8;
  } else if (placement.startsWith('bottom')) {
    top = triggerRect.bottom + 8;
  } else if (placement.startsWith('left') || placement.startsWith('right')) {
    top = triggerRect.top + (triggerRect.height - contentRect.height) / 2;
  }

  // Posicionamiento horizontal (left/right)
  if (placement.startsWith('left')) {
    left = triggerRect.left - contentRect.width - 8;
  } else if (placement.startsWith('right')) {
    left = triggerRect.right + 8;
  } else if (placement.startsWith('top') || placement.startsWith('bottom')) {
    left = triggerRect.left + (triggerRect.width - contentRect.width) / 2;
  }

  // Ajustes para variantes start/end
  if (placement.endsWith('start')) {
    if (placement.startsWith('top') || placement.startsWith('bottom')) {
      left = triggerRect.left;
    } else {
      top = triggerRect.top;
    }
  } else if (placement.endsWith('end')) {
    if (placement.startsWith('top') || placement.startsWith('bottom')) {
      left = triggerRect.right - contentRect.width;
    } else {
      top = triggerRect.bottom - contentRect.height;
    }
  }

  // Ajustes para mantener el popover dentro de la ventana
  const padding = 8;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  // Prevenir que el popover se salga por la derecha o izquierda
  if (left + contentRect.width > windowWidth - padding) {
    left = windowWidth - contentRect.width - padding;
  }
  if (left < padding) {
    left = padding;
  }

  // Prevenir que el popover se salga por arriba o abajo
  if (top + contentRect.height > windowHeight - padding) {
    top = windowHeight - contentRect.height - padding;
  }
  if (top < padding) {
    top = padding;
  }

  return { top, left };
};
