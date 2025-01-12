import { useEffect, useRef, useState } from 'react';
import { usePDFStore } from '../store/usePDFStore';

export const PDFCanvas = () => {
  const {
    pdfDoc,
    currentPage,
    setCurrentPage,
    setIsControlChange,
    isControlChange,
    renderPage,
    scale,
    lastControlChange,
    initialLoad
  } = usePDFStore();
  const [shouldCenter, setShouldCenter] = useState(true);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrollBlocked, setIsScrollBlocked] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>(); // Referencia para el timer

  // Efecto para manejar el bloqueo cuando hay cambios por control
  useEffect(() => {
    // Solo activamos el bloqueo si el cambio viene de control/input
    if (isControlChange) {
      setIsScrollBlocked(true);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // Configuramos un nuevo timer para desbloquear
      timerRef.current = setTimeout(() => {
        setIsScrollBlocked(false); // Desactivamos el bloqueo
        setIsControlChange(false); // Reseteamos el estado de control
      }, 1500); // Tiempo de bloqueo en ms

      // Cleanup: aseguramos limpiar el timer si el componente se desmonta
      // o si hay un nuevo cambio antes de que termine el timer
      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    }
  }, [isControlChange, lastControlChange, setIsControlChange]);

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

  // Observador para cambiar de pagina cuando se cambia el scroll
  useEffect(() => {
    if (initialLoad) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !isScrollBlocked) {
            // verificación de bloqueo
            const container = entry.target.closest('[data-page]');
            const pageNumber = container ? Number(container.getAttribute('data-page')) : null;

            if (pageNumber) {
              setCurrentPage(pageNumber, 'scroll');
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    const pageContainers = document.querySelectorAll('[data-page]');
    pageContainers.forEach(container => {
      observer.observe(container);
    });

    return () => observer.disconnect();
  }, [setCurrentPage, isScrollBlocked, initialLoad]);

  // Observer para centrar el canvas
  useEffect(() => {
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
  }, [scale]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-auto bg-gray-100 rounded-md">
      <div className={`flex flex-col gap-2 min-h-full ${shouldCenter ? 'items-center' : ''}`}>
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
