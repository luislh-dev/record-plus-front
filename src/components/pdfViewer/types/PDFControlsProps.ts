export interface PDFControlsProps {
  currentPage: number;
  totalPages: number | undefined;
  scale: number;
  onChangePage: (page: number) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  downloadPdf: () => void;
}
