import { FC } from 'react';
import { usePopover } from '../context/PopoverContext';

interface PopoverTriggerProps {
  children: React.ReactNode;
  className?: string;
}

export const PopoverTrigger: FC<PopoverTriggerProps> = ({ children, className = '' }) => {
  const { setOpen, triggerRef, open } = usePopover();

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div ref={triggerRef} onClick={handleClick} className={`cursor-pointer ${className}`}>
      {children}
    </div>
  );
};
