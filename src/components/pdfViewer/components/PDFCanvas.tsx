import { useEffect, useRef } from 'react';
import { usePageDetection } from '../hooks/determineCurrentPage';
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
    initialLoad,
    allMatches,
    currentMatchIndex,
    searchInDocument,
    isCalculatingHighlights
  } = usePDFStore();

  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrollBlocked = useRef(false);
  const timerRef = useRef<NodeJS.Timeout>(); // Referencia para el timer
  const shouldCenter = useCenterCanvas({ containerRef, canvasRefs, scale });

  const determineCurrentPage = usePageDetection({ containerRef, isScrollBlocked });

  // Efecto para manejar el recálculo de highlights con transición suave
  useEffect(() => {
    if (pdfDoc) {
      // Espera a que las nuevas posiciones se calculen
      searchInDocument(pdfDoc, scale);
    }
  }, [pdfDoc, scale, searchInDocument]);

  /**
   * Efecto para manejar el bloqueo temporal del scroll después de cambios por control
   * Previene que el observer de intersección detecte cambios durante la navegación controlada
   * El bloqueo se libera después de 1.5 segundos
   */
  useEffect(() => {
    if (isControlChange) {
      isScrollBlocked.current = true;

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        isScrollBlocked.current = false;
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

    const container = containerRef.current;

    const observer = new IntersectionObserver(
      () => {
        const newPage = determineCurrentPage();
        if (newPage !== null && newPage !== currentPage) {
          setCurrentPage(newPage, 'scroll');
        }
      },
      {
        threshold: 0.5,
        rootMargin: '0px'
      }
    );

    const handleScroll = () => {
      if (!isScrollBlocked.current) {
        requestAnimationFrame(() => {
          const newPage = determineCurrentPage();
          if (newPage !== null && newPage !== currentPage) {
            setCurrentPage(newPage, 'scroll');
          }
        });
      }
    };

    const pageContainers = document.querySelectorAll('[data-page]');
    pageContainers.forEach(container => {
      observer.observe(container);
    });

    // Usamos la variable container en lugar de containerRef.current
    container?.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      // Usamos la misma variable en la función de limpieza
      container?.removeEventListener('scroll', handleScroll);
    };
  }, [setCurrentPage, initialLoad, currentPage, pdfDoc?.numPages, determineCurrentPage]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-auto bg-gray-100 rounded-md">
      <div className={`flex flex-col gap-2 min-h-full ${shouldCenter ? 'items-center' : ''}`}>
        {Array.from({ length: pdfDoc?.numPages || 0 }, (_, index) => (
          <div
            key={`page-${index + 1}`}
            data-page={index + 1}
            className={`relative inline-block ${shouldCenter ? 'flex justify-center' : ''}`}
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

            {/* Capa de highlights */}
            <div className="absolute inset-0">
              {!isCalculatingHighlights &&
                allMatches
                  .filter(match => match.pageIndex === index)
                  .map((match, matchIndex) => (
                    <div
                      key={`highlight-${matchIndex}`}
                      className={`absolute transition-all duration-200 ${
                        currentMatchIndex === matchIndex
                          ? 'bg-blue-300 opacity-60'
                          : 'bg-yellow-200 opacity-80'
                      }`}
                      style={{
                        left: `${match.position.x}px`,
                        top: `${match.position.y}px`,
                        width: `${match.position.width}px`,
                        height: `${match.position.height}px`,
                        transform: 'scale(1.05)',
                        borderRadius: '2px'
                      }}
                    />
                  ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
