import type { FC } from 'react';
import { usePopover } from '../context/PopoverContext';

interface PopoverTriggerProps {
  children: React.ReactNode;
  className?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
  id?: string;
}

export const PopoverTrigger: FC<PopoverTriggerProps> = ({
  children,
  className = '',
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
  id
}) => {
  const { setOpen, triggerRef, open } = usePopover();

  return (
    <button
      ref={triggerRef}
      onClick={() => setOpen(!open)}
      className={`cursor-pointer ${className}`}
      type="button"
      aria-expanded={open}
      aria-haspopup="true"
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
      id={id}
    >
      {children}
    </button>
  );
};
