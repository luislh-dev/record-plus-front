import { RefObject, useEffect, useState } from 'react';

interface UseCenterCanvasProps {
  containerRef: RefObject<HTMLDivElement>;
  canvasRefs: RefObject<(HTMLCanvasElement | null)[]>;
  scale: number;
}

/**
 * Efecto para centrar el canvas cuando su ancho es menor que el contenedor
 * Utiliza ResizeObserver para detectar cambios en las dimensiones
 * @param containerRef Referencia al contenedor del canvas
 * @param canvasRefs Referencia a los canvas
 * @param scale Escala actual del PDF
 * @returns Indica si el canvas debe centrarse
 */
export const useCenterCanvas = ({ containerRef, canvasRefs, scale }: UseCenterCanvasProps) => {
  const [shouldCenter, setShouldCenter] = useState(true);

  useEffect(() => {
    if (!canvasRefs.current) return;

    const canvas = canvasRefs.current[0];
    if (!canvas) return;

    const observer = new ResizeObserver(() => {
      const container = containerRef.current;
      if (container && canvas) {
        setShouldCenter(canvas.width < container.clientWidth);
      }
    });

    observer.observe(canvas);
    return () => observer.disconnect();
  }, [scale, containerRef, canvasRefs]);

  return shouldCenter;
};
