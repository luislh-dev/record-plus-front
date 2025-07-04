import type { PDFDocumentProxy } from 'pdfjs-dist';
import type { PageChangeSource } from './PageChangeSource';
import type { SearchResult } from './SearchResult';
import type { SearchMatch } from './SearchTypes';

export interface BasePDFSlice {
  pdfDoc: PDFDocumentProxy | null;
  src: string | null;
  isLoading: boolean;
  setSrc: (src: string) => void;
  setPdfDoc: (doc: PDFDocumentProxy) => void;
  setLoading: (isLoading: boolean) => void;
}

export interface NavigationSlice {
  currentPage: number;
  isControlChange: boolean;
  lastControlChange: number;
  initialLoad: boolean;
  setIsControlChange: (value: boolean) => void;
  setInitialLoad: (value: boolean) => void;
  setCurrentPage: (page: number, source: PageChangeSource) => void;
  handlePageChange: (page: number, source: PageChangeSource) => void;
}

export interface ZoomSlice {
  scale: number;
  setScale: (scale: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
}

export interface RenderSlice {
  renderPage: (pageNumber: number, canvas: HTMLCanvasElement) => Promise<void>;
}

export interface SearchSlice {
  searchText: string;
  searchResults: SearchResult[];
  allMatches: SearchMatch[];
  currentMatchIndex: number;
  isSearching: boolean;
  totalMatches: number;
  isCalculatingHighlights: boolean;
  matchesByPage: Record<number, SearchMatch[]>;
  setSearchText: (text: string) => void;
  searchInDocument: (pdfDoc: PDFDocumentProxy, scale: number) => Promise<void>;
  nextMatch: () => void;
  previousMatch: () => void;
  clearSearch: () => void;
}

export interface PDFStore
  extends BasePDFSlice,
    NavigationSlice,
    ZoomSlice,
    RenderSlice,
    SearchSlice {
  initialize: (src: string, scale?: number) => Promise<void>;
  downloadPDF: () => void;
}
