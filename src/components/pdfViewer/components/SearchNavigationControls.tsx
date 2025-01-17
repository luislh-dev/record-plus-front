import { ArrowDown } from '@/icons/ArrowDown';
import { ArrowUp } from '@/icons/ArrowUp';
import { useEffect } from 'react';
import { usePDFSearchStore } from '../store/usePDFSearchStore';
import { usePDFStore } from '../store/usePDFStore';
import { ControlButton } from './common/ControlButton';

export const SearchNavigationControls = () => {
  const handlePageChange = usePDFStore(state => state.handlePageChange);
  const { currentMatchIndex, nextMatch, previousMatch, totalMatches, allMatches } =
    usePDFSearchStore();

  const maxDigits = totalMatches.toString().length + 'ch';

  const handleResultNavigation = async (direction: 'next' | 'previous') => {
    // Actualizamos el índice
    if (direction === 'next') {
      nextMatch();
    } else {
      previousMatch();
    }
  };

  useEffect(() => {
    const currentMatch = allMatches[currentMatchIndex];
    if (currentMatch && typeof currentMatch.pageIndex === 'number') {
      handlePageChange(currentMatch.pageIndex + 1, 'input');
    }
  }, [currentMatchIndex, allMatches, handlePageChange]);

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        <div className="text-sm text-right tabular-nums" style={{ minWidth: maxDigits }}>
          {currentMatchIndex + 1}
        </div>
        <span className="w-2 text-center">/</span>
        <div className="text-sm text-right tabular-nums" style={{ minWidth: maxDigits }}>
          {totalMatches}
        </div>
      </div>
      <div className="flex">
        <ControlButton
          onClick={() => handleResultNavigation('previous')}
          disabled={!allMatches.length}
          className="enabled:hover:bg-gray-200"
        >
          <ArrowUp />
        </ControlButton>
        <ControlButton
          onClick={() => handleResultNavigation('next')}
          className="enabled:hover:bg-gray-200"
          disabled={!allMatches.length}
        >
          <ArrowDown />
        </ControlButton>
      </div>
    </div>
  );
};
