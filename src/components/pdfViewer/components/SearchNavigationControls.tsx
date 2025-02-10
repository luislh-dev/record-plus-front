import { ArrowDown } from '@/icons/ArrowDown';
import { ArrowUp } from '@/icons/ArrowUp';
import { usePDFStore } from '../store/usePDFStore';
import { ControlButton } from './common/ControlButton';

export const SearchNavigationControls = () => {
  const currentMatchIndex = usePDFStore((state) => state.currentMatchIndex);
  const nextMatch = usePDFStore((state) => state.nextMatch);
  const previousMatch = usePDFStore((state) => state.previousMatch);
  const allMatches = usePDFStore((state) => state.allMatches);
  const totalMatches = usePDFStore((state) => state.totalMatches);

  const maxDigits = `${totalMatches.toString().length}ch`;

  const HandleNextMatch = () => {
    nextMatch();
  };

  const HandlePreviousMatch = () => {
    previousMatch();
  };

  return (
    <div className='flex items-center gap-2'>
      <div className='flex items-center gap-1'>
        <div className='text-sm text-right tabular-nums' style={{ minWidth: maxDigits }}>
          {currentMatchIndex + 1}
        </div>
        <span className='w-2 text-center'>/</span>
        <div className='text-sm text-right tabular-nums' style={{ minWidth: maxDigits }}>
          {totalMatches}
        </div>
      </div>
      <div className='flex'>
        <ControlButton
          onClick={HandlePreviousMatch}
          disabled={!allMatches.length}
          className='enabled:hover:bg-gray-200'
        >
          <ArrowUp />
        </ControlButton>
        <ControlButton
          onClick={HandleNextMatch}
          className='enabled:hover:bg-gray-200'
          disabled={!allMatches.length}
        >
          <ArrowDown />
        </ControlButton>
      </div>
    </div>
  );
};
