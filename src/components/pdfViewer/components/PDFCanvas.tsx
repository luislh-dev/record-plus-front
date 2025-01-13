import { useCallback, useEffect, useRef } from 'react';
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
  const isScrollBlocked = useRef(false);
  const timerRef = useRef<NodeJS.Timeout>(); // Referencia para el timer
  const shouldCenter = useCenterCanvas({ containerRef, canvasRefs, scale });

  const determineCurrentPage = useCallback(() => {
    if (isScrollBlocked.current || !containerRef.current) return null;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const visiblePages = Array.from(document.querySelectorAll('[data-page]')).filter(page => {
      const rect = page.getBoundingClientRect();
      return rect.top < containerRect.bottom && rect.bottom > containerRect.top;
    });

    if (visiblePages.length === 0) return null;

    // Calcular el porcentaje de scroll
    const scrollPosition = container.scrollTop;
    const scrollHeight = container.scrollHeight - container.clientHeight;
    const scrollPercentage = scrollPosition / scrollHeight;

    // Umbral de detección para inicio y final (ajustable según necesidad)
    const threshold = 0.1; // 10% del scroll

    // Detectar inicio del documento
    if (scrollPercentage <= threshold) {
      // Encontrar la página visible más cercana al inicio
      return Number(visiblePages[0].getAttribute('data-page'));
    }

    // Detectar final del documento
    if (scrollPercentage >= 1 - threshold) {
      // Encontrar la página visible más cercana al final
      return Number(visiblePages[visiblePages.length - 1].getAttribute('data-page'));
    }

    // Para el resto de casos, usar una combinación de visibilidad y distancia al centro
    let closestPage: number | null = null;
    let minDistance = Infinity;

    visiblePages.forEach(page => {
      const rect = page.getBoundingClientRect();
      const pageCenter = rect.top + rect.height / 2;
      const containerCenter = containerRect.top + container.clientHeight / 2;
      const distance = Math.abs(pageCenter - containerCenter);

      // Factor de visibilidad: qué tanto de la página está visible
      const visibleHeight =
        Math.min(rect.bottom, containerRect.bottom) - Math.max(rect.top, containerRect.top);
      const visibilityFactor = visibleHeight / rect.height;

      // Combinar distancia al centro con factor de visibilidad
      const weightedDistance = distance * (1 / visibilityFactor);

      if (weightedDistance < minDistance) {
        minDistance = weightedDistance;
        closestPage = Number(page.getAttribute('data-page'));
      }
    });

    return closestPage;
  }, []);

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
