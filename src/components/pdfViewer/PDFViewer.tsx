import { PDFCanvas } from './components/PDFCanvas';
import { PDFControls } from './components/PDFControls';
import { usePDFRenderer } from './hooks/usePDFRenderer';
import type { PDFViewerProps } from './types/PDFViewerProps';

export const PDFViewer = ({ src }: PDFViewerProps) => {
  const {
    canvasRef,
    containerRef,
    pdfDoc,
    currentPage,
    scale,
    isLoading,
    setCurrentPage,
    nextPage,
    prevPage,
    zoomIn,
    zoomOut,
    downloadPDF
  } = usePDFRenderer(src);

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <div ref={containerRef} className="w-full bg-gray-200 rounded-lg shadow-2xl p-4">
        {isLoading ? (
          <div className="w-full h-64 flex items-center justify-center">
            <span className="text-gray-500">Cargando PDF...</span>
          </div>
        ) : (
          <>
            <PDFControls
              currentPage={currentPage}
              totalPages={pdfDoc?.numPages}
              scale={scale}
              onChangePage={setCurrentPage}
              onPrevPage={prevPage}
              onNextPage={nextPage}
              onZoomIn={zoomIn}
              onZoomOut={zoomOut}
              downloadPdf={downloadPDF}
            />
            <div className="relative w-full">
              <PDFCanvas canvasRef={canvasRef} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
