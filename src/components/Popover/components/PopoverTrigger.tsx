import { FC } from 'react';
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
    <div
      ref={triggerRef}
      onClick={() => setOpen(!open)}
      className={`cursor-pointer ${className}`}
      role="button"
      tabIndex={0}
      aria-expanded={open}
      aria-haspopup="true"
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
      id={id}
    >
      {children}
    </div>
  );
};
