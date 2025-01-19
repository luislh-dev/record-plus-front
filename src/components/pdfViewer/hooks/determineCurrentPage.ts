import { RefObject, useCallback } from 'react';

interface UsePageDetectionProps {
  containerRef: RefObject<HTMLDivElement>;
  isScrollBlocked: RefObject<boolean>;
}

export const usePageDetection = ({ containerRef, isScrollBlocked }: UsePageDetectionProps) => {
  return useCallback(() => {
    if (isScrollBlocked.current || !containerRef.current) return null;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const visiblePages = Array.from(document.querySelectorAll('[data-page]')).filter(page => {
      const rect = page.getBoundingClientRect();
      return rect.top < containerRect.bottom && rect.bottom > containerRect.top;
    });

    if (visiblePages.length === 0) return null;

    // Función auxiliar para calcular el porcentaje visible de una página
    const calculateVisiblePercentage = (page: Element) => {
      const rect = page.getBoundingClientRect();
      const visibleHeight =
        Math.min(rect.bottom, containerRect.bottom) - Math.max(rect.top, containerRect.top);
      return visibleHeight / rect.height;
    };

    // Caso para 2 o 3 páginas visibles
    if (visiblePages.length <= 3) {
      // Calcular porcentaje visible para cada página
      const pagesWithVisibility = visiblePages.map(page => ({
        page,
        visiblePercentage: calculateVisiblePercentage(page),
        pageNumber: Number(page.getAttribute('data-page'))
      }));

      // Ordenar por porcentaje de visibilidad
      pagesWithVisibility.sort((a, b) => b.visiblePercentage - a.visiblePercentage);

      // Si la página más visible tiene más del 40% de visibilidad, usarla
      if (pagesWithVisibility[0].visiblePercentage > 0.4) {
        return pagesWithVisibility[0].pageNumber;
      }

      // Si no hay una página claramente más visible, usar la del medio para 3 páginas
      if (visiblePages.length === 3) {
        return Number(visiblePages[1].getAttribute('data-page'));
      }

      // Para 2 páginas, si la segunda es visible en más del 30%, usarla
      if (visiblePages.length === 2 && pagesWithVisibility[1].visiblePercentage > 0.3) {
        return pagesWithVisibility[1].pageNumber;
      }

      // En otro caso, usar la primera página más visible
      return pagesWithVisibility[0].pageNumber;
    }

    // Para casos con más páginas visibles (4 o más)
    const scrollPosition = container.scrollTop;
    const scrollHeight = container.scrollHeight - container.clientHeight;
    const scrollPercentage = scrollPosition / scrollHeight;
    const threshold = 0.1;

    // Detectar inicio del documento
    if (scrollPercentage <= threshold) {
      return Number(visiblePages[0].getAttribute('data-page'));
    }

    // Detectar final del documento
    if (scrollPercentage >= 1 - threshold) {
      return Number(visiblePages[visiblePages.length - 1].getAttribute('data-page'));
    }

    // Para el resto de casos
    let closestPage: number | null = null;
    let maxVisibility = -1;

    visiblePages.forEach(page => {
      const rect = page.getBoundingClientRect();
      const pageCenter = rect.top + rect.height / 2;
      const containerCenter = containerRect.top + container.clientHeight / 2;
      const distanceToCenter = Math.abs(pageCenter - containerCenter);

      // Calcular visibilidad y centrado
      const visiblePercentage = calculateVisiblePercentage(page);
      const centeringFactor = 1 - distanceToCenter / container.clientHeight;

      // Combinar visibilidad con factor de centrado
      const weightedVisibility = visiblePercentage * centeringFactor;

      if (weightedVisibility > maxVisibility) {
        maxVisibility = weightedVisibility;
        closestPage = Number(page.getAttribute('data-page'));
      }
    });

    return closestPage;
  }, [containerRef, isScrollBlocked]);
};
