import { ArrowDown } from '@/icons/ArrowDown';
import { ArrowUp } from '@/icons/ArrowUp';
import { useEffect } from 'react';
import { usePDFSearchStore } from '../store/usePDFSearchStore';
import { usePDFStore } from '../store/usePDFStore';

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
      <div>
        <button
          onClick={() => handleResultNavigation('previous')}
          className="p-1 hover:bg-gray-200 rounded-md"
          disabled={!allMatches.length}
        >
          <ArrowUp />
        </button>
        <button
          onClick={() => handleResultNavigation('next')}
          className="p-1 hover:bg-gray-200 rounded-md"
          disabled={!allMatches.length}
        >
          <ArrowDown />
        </button>
      </div>
    </div>
  );
};
