import { useEffect, useRef, useState } from 'react';
import { usePDFStore } from '../store/usePDFStore';

export const PDFCanvas = () => {
  const { pdfDoc, currentPage, isControlChange, renderPage, scale } = usePDFStore();
  const [shouldCenter, setShouldCenter] = useState(true);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Renderizar páginas cuando están disponibles
  useEffect(() => {
    canvasRefs.current.forEach((canvas, index) => {
      if (canvas) {
        renderPage(index + 1, canvas);
      }
    });
  }, [renderPage, pdfDoc, scale]);

  // Scroll a la página actual cuando cambia por control
  useEffect(() => {
    if (!isControlChange) return;

    const currentCanvas = canvasRefs.current[currentPage - 1];
    if (currentCanvas) {
      currentCanvas.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [currentPage, isControlChange]);

  // Observer para centrar el canvas
  useEffect(() => {
    const canvas = canvasRefs.current[0];
    if (!canvas) return;

    const observer = new ResizeObserver(() => {
      const container = canvas.parentElement?.parentElement;
      if (container) {
        setShouldCenter(canvas.width < container.clientWidth);
      }
    });

    observer.observe(canvas);
    return () => observer.disconnect();
  }, [scale]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-auto bg-gray-100 rounded-md">
      <div className={`flex flex-col gap-4 p-4 min-h-full ${shouldCenter ? 'items-center' : ''}`}>
        {Array.from({ length: pdfDoc?.numPages || 0 }, (_, index) => (
          <div
            key={`page-${index + 1}`}
            data-page={index + 1}
            className={`inline-block ${shouldCenter ? 'flex justify-center' : ''}`}
          >
            <canvas
              ref={el => (canvasRefs.current[index] = el)}
              className="shadow-2xl"
              style={{
                maxWidth: 'none',
                width: 'auto',
                height: 'auto'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
