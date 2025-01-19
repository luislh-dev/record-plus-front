import { useEffect, useRef } from 'react';

/**
 * Hook para manejar el bloqueo temporal del scroll después de cambios por control
 * Previene que el observer de intersección detecte cambios durante la navegación controlada
 * El bloqueo se libera después de 1.5 segundos
 */
export const useScrollControl = (
  isControlChange: boolean,
  setIsControlChange: (value: boolean) => void,
  lastControlChange: number
) => {
  const isScrollBlocked = useRef(false);
  const timerRef = useRef<NodeJS.Timeout>();

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
  }, [isControlChange, setIsControlChange, lastControlChange]);

  return isScrollBlocked;
};
