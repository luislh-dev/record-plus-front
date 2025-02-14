import { Popover } from '@/components/Popover/components/Popover';
import { PopoverContent } from '@/components/Popover/components/PopoverContent';
import { PopoverTrigger } from '@/components/Popover/components/PopoverTrigger';
import { Search } from '@/icons/Search';
import { PDFSearchControls } from './PDFSearchControls';
import { ControlButton } from './common/ControlButton';

export const PropoverSearch = () => {
  return (
    <Popover isDismissable={false} placement='bottom-start'>
      <PopoverTrigger>
        <ControlButton>
          <Search size={20} />
        </ControlButton>
      </PopoverTrigger>
      <PopoverContent>
        <div className='p-2'>
          <PDFSearchControls />
        </div>
      </PopoverContent>
    </Popover>
  );
};
