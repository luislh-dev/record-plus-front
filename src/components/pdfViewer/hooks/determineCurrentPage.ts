import { type RefObject, useCallback } from 'react';

interface UsePageDetectionProps {
  containerRef: RefObject<HTMLDivElement>;
  isScrollBlocked: RefObject<boolean>;
}

export const usePageDetection = ({ containerRef, isScrollBlocked }: UsePageDetectionProps) => {
  return useCallback(() => {
    if (isScrollBlocked.current || !containerRef.current) return null;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();

    // Obtener todas las páginas visibles
    const visiblePages = Array.from(document.querySelectorAll('[data-page]')).filter((page) => {
      const rect = page.getBoundingClientRect();
      const isVisible = rect.top < containerRect.bottom && rect.bottom > containerRect.top;
      return isVisible;
    });

    if (visiblePages.length === 0) return null;

    // Encontrar la página más visible basándose en la posición central
    const containerCenter = containerRect.top + containerRect.height / 2;

    let closestPage = visiblePages[0];
    let smallestDistance = Number.POSITIVE_INFINITY;

    for (let i = 0; i < visiblePages.length; i++) {
      const page = visiblePages[i];
      const rect = page.getBoundingClientRect();
      const pageCenter = rect.top + rect.height / 2;
      const distance = Math.abs(pageCenter - containerCenter);

      if (distance < smallestDistance) {
        smallestDistance = distance;
        closestPage = page;
      }
    }

    return Number(closestPage.getAttribute('data-page'));
  }, [containerRef, isScrollBlocked]);
};
