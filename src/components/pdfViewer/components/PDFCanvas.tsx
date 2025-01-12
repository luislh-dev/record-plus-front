import { useEffect, useRef, useState } from 'react';
import { useCenterCanvas } from '../hooks/useCenterCanvas';
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

  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrollBlocked, setIsScrollBlocked] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>(); // Referencia para el timer

  const shouldCenter = useCenterCanvas({ containerRef, canvasRefs, scale });

  /**
   * Efecto para manejar el bloqueo temporal del scroll después de cambios por control
   * Previene que el observer de intersección detecte cambios durante la navegación controlada
   * El bloqueo se libera después de 1.5 segundos
   */
  useEffect(() => {
    if (isControlChange) {
      setIsScrollBlocked(true);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        setIsScrollBlocked(false);
        setIsControlChange(false);
      }, 1500);

      return () => {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      };
    }
  }, [isControlChange, lastControlChange, setIsControlChange]);

  /**
   * Efecto para renderizar todas las páginas del PDF
   * Se ejecuta cuando cambia el documento, la escala o la función de renderizado
   */
  useEffect(() => {
    canvasRefs.current.forEach((canvas, index) => {
      if (canvas) {
        renderPage(index + 1, canvas);
      }
    });
  }, [renderPage, pdfDoc, scale]);

  /**
   * Efecto para scrollear automáticamente a la página seleccionada
   * Solo se activa cuando el cambio viene desde los controles (no por scroll)
   */
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

  /**
   * Efecto para manejar la carga inicial del PDF
   * Fuerza el scroll a la primera página y establece el estado inicial
   */
  useEffect(() => {
    if (initialLoad && pdfDoc) {
      const firstCanvas = canvasRefs.current[0];
      if (firstCanvas) {
        firstCanvas.scrollIntoView({ behavior: 'auto', block: 'start' });
        setCurrentPage(1, 'control');
      }
      setTimeout(() => {
        usePDFStore.getState().setInitialLoad(false);
      }, 100);
    }
  }, [initialLoad, pdfDoc, setCurrentPage]);

  /**
   * Efecto para detectar la página visible actual mediante Intersection Observer
   * Actualiza el estado de la página actual basado en el scroll
   * No se activa durante el bloqueo temporal o la carga inicial
   */
  useEffect(() => {
    if (initialLoad) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !isScrollBlocked) {
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
