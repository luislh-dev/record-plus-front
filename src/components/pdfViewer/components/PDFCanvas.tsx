import { useEffect, useRef, useState } from 'react';
import { usePDFStore } from '../store/usePDFStore';

export const PDFCanvas = () => {
  const {
    pdfDoc,
    currentPage,
    isControlChange,
    handlePageChange,
    renderPage,
    scale,
    initialPagesLoaded
  } = usePDFStore();

  const [shouldCenter, setShouldCenter] = useState(true);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Pre-inicializar el array de refs
  useEffect(() => {
    canvasRefs.current = Array(pdfDoc?.numPages || 0).fill(null);
  }, [pdfDoc?.numPages]);

  // Renderizar páginas cuando están disponibles
  useEffect(() => {
    if (!pdfDoc) return;

    // Priorizar renderizado de las primeras páginas
    const renderInitialPages = async () => {
      const initialPages = [1, 2];
      for (const pageNum of initialPages) {
        const canvas = canvasRefs.current[pageNum - 1];
        if (canvas) {
          await renderPage(pageNum, canvas);
        }
      }
    };

    // Renderizar el resto de páginas
    const renderRemainingPages = async () => {
      for (let i = 2; i < pdfDoc.numPages; i++) {
        const canvas = canvasRefs.current[i];
        if (canvas) {
          await renderPage(i + 1, canvas);
        }
      }
    };

    renderInitialPages().then(() => {
      if (initialPagesLoaded) {
        renderRemainingPages();
      }
    });
  }, [pdfDoc, renderPage, scale, initialPagesLoaded]);

  // Scroll a la página actual cuando cambia por control
  useEffect(() => {
    if (!isControlChange || !initialPagesLoaded) return;

    const currentCanvas = canvasRefs.current[currentPage - 1];
    if (currentCanvas) {
      currentCanvas.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, [currentPage, isControlChange, initialPagesLoaded]);

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
  }, []);

  // Observer para cambio de página al hacer scroll
  useEffect(() => {
    if (!initialPagesLoaded) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !isControlChange) {
            const pageDiv = entry.target as HTMLDivElement;
            const pageNumber = parseInt(pageDiv.getAttribute('data-page') || '1');
            handlePageChange(pageNumber, 'scroll');
          }
        });
      },
      {
        root: containerRef.current,
        threshold: 0.6
      }
    );

    const pageElements = document.querySelectorAll('[data-page]');
    pageElements.forEach(element => observer.observe(element));

    return () => observer.disconnect();
  }, [handlePageChange, isControlChange, initialPagesLoaded]);

  return (
    <div ref={containerRef} className="w-full h-full overflow-auto bg-gray-100 rounded-md">
      <div className="flex flex-col items-center gap-4 p-4">
        {Array.from({ length: pdfDoc?.numPages || 0 }, (_, index) => (
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
