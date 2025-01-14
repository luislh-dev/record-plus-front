import { useRef, useState } from 'react';
import { PopoverProvider } from '../context/PopoverContext';
import { Placement } from '../types/Placement';

interface PopoverProps {
  placement?: Placement;
  children: React.ReactNode;
  className?: string;
  isDismissable?: boolean;
}

export const Popover: React.FC<PopoverProps> = ({
  children,
  placement = 'bottom',
  className = '',
  isDismissable = true
}) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  return (
    <PopoverProvider value={{ open, setOpen, triggerRef, placement, isDismissable }}>
      <div className={`relative inline-block ${className}`}>{children}</div>
    </PopoverProvider>
  );
};
