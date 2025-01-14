import { createContext, useContext } from 'react';
import { Placement } from '../types/Placement';

interface PopoverContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLDivElement>;
  placement: Placement;
  isDismissable: boolean;
}

const PopoverContext = createContext<PopoverContextType | undefined>(undefined);

export const usePopover = () => {
  const context = useContext(PopoverContext);

  if (context === undefined) {
    throw new Error('usePopover debe usarse dentro de un PopoverProvider');
  }

  return context;
};

export const PopoverProvider = PopoverContext.Provider;
