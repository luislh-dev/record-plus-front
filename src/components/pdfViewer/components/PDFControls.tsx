import { ArrowDown } from '@/icons/ArrowDown';
import { ArrowUp } from '@/icons/ArrowUp';
import { Download } from '@/icons/Download';
import { ZoomIn } from '@/icons/ZoomIn';
import { ZoomOut } from '@/icons/ZoomOut';
import { allowOnlyNumbers } from '@/utils/allowOnlyNumbers';
import { useCallback, useEffect } from 'react';
import { usePDFStore } from '../store/usePDFStore';
import { ControlButton } from './common/ControlButton';
import { PropoverSearch } from './PopoverSearch';

export const PDFControls = () => {
  const { currentPage, pdfDoc, scale, handlePageChange, zoomIn, zoomOut, downloadPDF } =
    usePDFStore();

  const totalPages = pdfDoc?.numPages;

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

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;

      switch (e.key) {
        case '+':
        case '=':
          e.preventDefault();
          zoomIn();
          break;
        case '-':
          e.preventDefault();
          zoomOut();
          break;
        case 'ArrowUp':
          e.preventDefault();
          goToPreviousPage();
          break;
        case 'ArrowDown':
          e.preventDefault();
          goToNextPage();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [goToNextPage, goToPreviousPage, zoomIn, zoomOut]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex  justify-between w-full items-center gap-4">
        {/* Navigation */}
        <div className="flex items-center gap-2">
          <PropoverSearch />
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

        {/* Zoom */}
        <div className="flex items-center gap-2">
          <ControlButton onClick={zoomOut}>
            <ZoomOut className="w-5 h-5" />
          </ControlButton>
          <span className="text-sm min-w-16 text-center hidden md:block">
            {Math.round(scale * 100)}%
          </span>
          <ControlButton onClick={zoomIn}>
            <ZoomIn className="w-5 h-5" />
          </ControlButton>
        </div>

        {/* Download */}
        <ControlButton onClick={downloadPDF}>
          <Download className="w-5 h-5" />
        </ControlButton>
      </div>
    </div>
  );
};
