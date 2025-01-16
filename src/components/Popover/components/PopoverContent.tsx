import { FC, useEffect, useRef, useState } from 'react';
import { usePopover } from '../context/PopoverContext';
import { Position } from '../types/Position';
import { calculatePosition } from '../utils/CalculatePosition';

interface PopoverContentProps {
  children: React.ReactNode;
  className?: string;
}

export const PopoverContent: FC<PopoverContentProps> = ({ children, className = '' }) => {
  const { open, setOpen, triggerRef, placement, isDismissable } = usePopover();
  const contentRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<Position>({ top: 0, left: 0 });

  useEffect(() => {
    if (!open || !triggerRef.current || !contentRef.current) return;

    const updatePosition = () => {
      const triggerRect = triggerRef.current?.getBoundingClientRect();
      const contentRect = contentRef.current?.getBoundingClientRect();

      if (triggerRect && contentRect) {
        const newPosition = calculatePosition(triggerRect, contentRect, placement);
        setPosition(newPosition);
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [open, placement, triggerRef]);

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
      style={{
        position: 'fixed',
        maxHeight: '80vh',
        top: `${position.top}px`,
        left: `${position.left}px`,
        transform: 'translate3d(0, 0, 0)'
      }}
    >
      <div className="w-full h-full">{children}</div>
    </div>
  );
};
