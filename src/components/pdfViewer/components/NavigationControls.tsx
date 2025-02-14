import { ArrowDown } from '@/icons/ArrowDown';
import { ArrowUp } from '@/icons/ArrowUp';
import { useCallback } from 'react';
import { usePDFStore } from '../store/usePDFStore';
import { ControlButton } from './common/ControlButton';

export const NavigationControls = () => {
  const handlePageChange = usePDFStore((state) => state.handlePageChange);
  const currentPage = usePDFStore((state) => state.currentPage);
  const totalPages = usePDFStore((state) => state.pdfDoc?.numPages);

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
    <div className='flex items-center gap-1.5'>
      <ControlButton
        onClick={goToPreviousPage}
        aria-label='Pagina anterior'
        disabled={currentPage <= 1}
        className='hidden md:block'
      >
        <ArrowUp size={20} />
      </ControlButton>
      <div>
        <input
          value={currentPage}
          type='number'
          className='w-8 px-1.5 rounded-md focus:outline-none'
          onChange={(e) => changePage(Number.parseInt(e.target.value))}
        />
        <span className='mx-2'>/</span>
        <span>{totalPages || '-'}</span>
      </div>
      <ControlButton
        onClick={goToNextPage}
        aria-label='Pagina siguiente'
        disabled={currentPage >= (totalPages ?? -1)}
        className='hidden md:block'
      >
        <ArrowDown size={20} />
      </ControlButton>
    </div>
  );
};
