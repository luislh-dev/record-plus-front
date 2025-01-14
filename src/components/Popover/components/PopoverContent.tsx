import { CSSProperties, FC, useEffect, useRef } from 'react';
import { usePopover } from '../context/PopoverContext';

interface PopoverContentProps {
  children: React.ReactNode;
  className?: string;
}

export const PopoverContent: FC<PopoverContentProps> = ({ children, className = '' }) => {
  const { open, setOpen, triggerRef, placement, isDismissable } = usePopover();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isDismissable) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setOpen, isDismissable, triggerRef]);

  if (!open) return null;

  const getPlacementStyles = (): CSSProperties => {
    const baseStyles: CSSProperties = {
      position: 'fixed', // Cambiamos a fixed para evitar problemas de overflow
      maxHeight: '80vh' // Limitamos la altura máxima al 80% del viewport
    };

    switch (placement) {
      case 'top':
        return {
          ...baseStyles,
          bottom: `calc(100% - ${triggerRef.current?.getBoundingClientRect().top}px)`,
          left: triggerRef.current?.getBoundingClientRect().left,
          marginBottom: '0.5rem'
        };
      case 'right':
        return {
          ...baseStyles,
          left: triggerRef.current?.getBoundingClientRect().right,
          top: triggerRef.current?.getBoundingClientRect().top,
          marginLeft: '0.5rem'
        };
      case 'left':
        return {
          ...baseStyles,
          right: `calc(100% - ${triggerRef.current?.getBoundingClientRect().left}px)`,
          top: triggerRef.current?.getBoundingClientRect().top,
          marginRight: '0.5rem'
        };
      default: // bottom
        return {
          ...baseStyles,
          top: triggerRef.current?.getBoundingClientRect().bottom,
          left: triggerRef.current?.getBoundingClientRect().left,
          marginTop: '0.5rem'
        };
    }
  };

  return (
    <div
      ref={contentRef}
      className={`
        fixed z-50
        bg-white rounded-lg
        shadow-lg border
        overflow-auto
        min-w-[10rem]
        max-w-[90vw]
        ${className}
      `}
      style={getPlacementStyles()}
    >
      <div className="w-full h-full">{children}</div>
    </div>
  );
};
