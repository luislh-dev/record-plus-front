import { ArrowDown } from '@/icons/ArrowDown';
import { ArrowUp } from '@/icons/ArrowUp';
import { Download } from '@/icons/Download';
import { ZoomIn } from '@/icons/ZoomIn';
import { ZoomOut } from '@/icons/ZoomOut';
import { allowOnlyNumbers } from '@/utils/allowOnlyNumbers';
import { usePDFStore } from '../store/usePDFStore';

export const PDFControls = () => {
  const { currentPage, pdfDoc, scale, handlePageChange, zoomIn, zoomOut, downloadPDF } =
    usePDFStore();

  const totalPages = pdfDoc?.numPages;

  return (
    <div className="flex items-center justify-between mb-2">
      <div className="flex  justify-between w-full items-center gap-4">
        {/* Navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              handlePageChange(currentPage - 1, 'control');
            }}
            disabled={currentPage <= 1}
            className="p-1 bg-inherit rounded-md hover:enabled:bg-gray-300"
          >
            <ArrowUp size={20} />
          </button>
          <div>
            <input
              value={currentPage}
              onInput={allowOnlyNumbers}
              className="w-8 px-1.5 rounded-md focus:outline-none"
              onChange={e => {
                const value = parseInt(e.target.value);
                if (value > 0 && value <= (totalPages ?? 1)) {
                  handlePageChange(value, 'input');
                }
              }}
            />
            <span className="mx-2">/</span>
            <span>{totalPages || '-'}</span>
          </div>
          <button
            onClick={() => {
              handlePageChange(currentPage + 1, 'control');
            }}
            disabled={currentPage >= (totalPages ?? -1)}
            className="p-1 bg-inherit rounded-md hover:enabled:bg-gray-300"
          >
            <ArrowDown size={20} />
          </button>
        </div>

        {/* Zoom */}
        <div className="flex items-center gap-2">
          <button onClick={zoomOut} className="p-1 bg-inherit rounded-md hover:enabled:bg-gray-300">
            <ZoomOut className="w-5 h-5" />
          </button>
          <span className="text-sm min-w-16 text-center hidden md:block">
            {Math.round(scale * 100)}%
          </span>
          <button onClick={zoomIn} className="p-1 bg-inherit rounded-md hover:enabled:bg-gray-300">
            <ZoomIn className="w-5 h-5" />
          </button>
        </div>

        {/* Download */}
        <button
          onClick={downloadPDF}
          className="p-1 bg-inherit rounded-md hover:enabled:bg-gray-300"
        >
          <Download className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
