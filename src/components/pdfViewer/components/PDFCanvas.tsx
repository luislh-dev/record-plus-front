import { RefObject, useEffect, useRef, useState } from 'react';

interface PDFCanvasProps {
  canvasRef: RefObject<HTMLCanvasElement>;
  renderPage: (pageNumber: number, canvas: HTMLCanvasElement) => Promise<void>;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
  totalPages?: number;
}

export const PDFCanvas = ({
  canvasRef,
  renderPage,
  totalPages = 1,
  currentPage,
  onPageChange
}: PDFCanvasProps) => {
  const [shouldCenter, setShouldCenter] = useState(true);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Pre-inicializar el array de refs
    canvasRefs.current = Array(totalPages).fill(null);
  }, [totalPages]);

  // Renderizar cada página cuando el canvas está disponible
  useEffect(() => {
    canvasRefs.current.forEach((canvas, index) => {
      if (canvas) {
        renderPage(index + 1, canvas);
      }
    });
  }, [renderPage, totalPages]);

  // Efecto para manejar el scroll cuando cambia la página
  useEffect(() => {
    const scrollToCurrentPage = () => {
      const container = containerRef.current;
      const currentCanvas = canvasRefs.current[currentPage - 1];

      if (container && currentCanvas) {
        currentCanvas.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    };

    scrollToCurrentPage();
  }, [currentPage]);

  // Centrar el canvas si es más pequeño que el contenedor
  useEffect(() => {
    if (!canvasRef.current) return;

    const observer = new ResizeObserver(() => {
      const canvas = canvasRef.current;
      const container = canvas?.parentElement?.parentElement;

      if (canvas && container) {
        setShouldCenter(canvas.width < container.clientWidth);
      }
    });

    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }

    return () => observer.disconnect();
  }, [canvasRef]);

  useEffect(() => {
    const options = {
      root: containerRef.current,
      threshold: 0.5 // 50% de visibilidad
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const pageDiv = entry.target as HTMLDivElement;
          const pageNumber = parseInt(pageDiv.getAttribute('data-page') || '1');
          onPageChange(pageNumber);
        }
      });
    }, options);

    // Observar cada div de página
    const pageElements = document.querySelectorAll('[data-page]');
    pageElements.forEach(element => observer.observe(element));

    return () => observer.disconnect();
  }, [onPageChange]);

  return (
    <div ref={containerRef} className="w-full h-full overflow-auto bg-gray-100 rounded-md">
      <div className="flex flex-col items-center gap-4 p-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <div
            key={`page-${index + 1}`}
            data-page={index + 1}
            className={`inline-block p-2 ${shouldCenter ? 'w-full text-center' : ''}`}
          >
            <canvas
              ref={el => (canvasRefs.current[index] = el)}
              className="shadow-2xl inline-block"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
