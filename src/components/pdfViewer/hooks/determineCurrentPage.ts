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
  }, [containerRef, isScrollBlocked]);
};
