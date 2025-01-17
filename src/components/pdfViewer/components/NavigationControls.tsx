import { ArrowDown } from '@/icons/ArrowDown';
import { ArrowUp } from '@/icons/ArrowUp';
import { allowOnlyNumbers } from '@/utils/allowOnlyNumbers';
import { useCallback } from 'react';
import { usePDFStore } from '../store/usePDFStore';
import { ControlButton } from './common/ControlButton';

export const NavigationControls = () => {
  const handlePageChange = usePDFStore(state => state.handlePageChange);
  const currentPage = usePDFStore(state => state.currentPage);
  const totalPages = usePDFStore(state => state.pdfDoc?.numPages);

  const changePage = (page: number) => {
    if (page > 0 && page <= (totalPages ?? 1)) {
      handlePageChange(page, 'input');
    }
  };

  const goToNextPage = useCallback(() => {
    if (currentPage < (totalPages ?? 1)) {
      handlePageChange(currentPage + 1, 'control');
    }
  }, [currentPage, totalPages, handlePageChange]);

  const goToPreviousPage = useCallback(() => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1, 'control');
    }
  }, [currentPage, handlePageChange]);

  return (
    <div className="flex">
      <ControlButton
        onClick={goToPreviousPage}
        aria-label="Pagina anterior"
        disabled={currentPage <= 1}
      >
        <ArrowUp size={20} />
      </ControlButton>
      <div>
        <input
          value={currentPage}
          onInput={allowOnlyNumbers}
          className="w-8 px-1.5 rounded-md focus:outline-none"
          onChange={e => changePage(parseInt(e.target.value))}
        />
        <span className="mx-2">/</span>
        <span>{totalPages || '-'}</span>
      </div>
      <ControlButton
        onClick={goToNextPage}
        aria-label="Pagina siguiente"
        disabled={currentPage >= (totalPages ?? -1)}
      >
        <ArrowDown size={20} />
      </ControlButton>
    </div>
  );
};
