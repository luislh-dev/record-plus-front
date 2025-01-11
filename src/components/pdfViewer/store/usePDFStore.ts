/* eslint-disable no-console */
import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';

import * as pdfjs from 'pdfjs-dist';
import { create } from 'zustand';
import { configurePDFJS } from '../config/pdfConfig';
import { ALLOWED_SCALES, DEFAULT_SCALE } from '../config/Zoom';
import { PageChangeSource } from '../types/PageChangeSource';
import { downloadFile } from '../utils/DownloadFIles';

interface PDFStore {
  pdfDoc: PDFDocumentProxy | null;
  currentPage: number;
  scale: number;
  isLoading: boolean;
  isControlChange: boolean;
  src: string | null;

  // Acciones básicas
  setSrc: (src: string) => void;
  setPdfDoc: (doc: PDFDocumentProxy) => void;
  setCurrentPage: (page: number, source: PageChangeSource) => void;
  setScale: (scale: number) => void;
  setIsControlChange: (isControl: boolean) => void;

  // Acciones compuestas
  renderPage: (pageNumber: number, canvas: HTMLCanvasElement) => Promise<void>;
  handlePageChange: (page: number, source: PageChangeSource) => void;
  initialize: (src: string, scaleInitial?: number) => Promise<void>;
  downloadPDF: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
}

export const usePDFStore = create<PDFStore>((set, get) => {
  configurePDFJS();

  return {
    pdfDoc: null,
    currentPage: 1,
    scale: DEFAULT_SCALE,
    isLoading: true,
    isControlChange: false,
    src: null,

    // Acciones básicas
    setSrc: src => set({ src }),
    setPdfDoc: doc => set({ pdfDoc: doc }),
    setScale: scale => set({ scale }),

    setIsControlChange: isControl => set({ isControlChange: isControl }),

    setCurrentPage: (page, source) => {
      const { pdfDoc } = get();
      if (!pdfDoc || page < 1 || page > pdfDoc.numPages) return;

      set({
        currentPage: page,
        isControlChange: source === 'control' || source === 'input'
      });

      // Resetear isControlChange después de un breve delay
      if (source === 'control' || source === 'input') {
        setTimeout(() => {
          set({ isControlChange: false });
        }, 1000); // Tiempo de espera para evitar cambios de página duplicados
      }
    },

    // Renderizado optimizado de página
    renderPage: async (pageNumber, canvas) => {
      const { pdfDoc, scale } = get();
      if (!pdfDoc) return;

      try {
        const page = await pdfDoc.getPage(pageNumber);
        const viewport = page.getViewport({ scale });

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: canvas.getContext('2d')!,
          viewport
        };

        await page.render(renderContext).promise;
      } catch (error) {
        console.error(`Error rendering page ${pageNumber}:`, error);
      }
    },

    handlePageChange: (page, source) => {
      const { setCurrentPage } = get();
      setCurrentPage(page, source);
    },

    // Inicialización del PDF
    initialize: async (src: string, scale?: number) => {
      const { setPdfDoc, setSrc } = get();

      set({
        isLoading: true,
        currentPage: 1
      });
      setSrc(src);

      try {
        const loadingTask = pdfjs.getDocument({
          url: src,
          useSystemFonts: true
        });

        const loadedDoc = await loadingTask.promise;
        setPdfDoc(loadedDoc);
        set({
          scale: scale ?? DEFAULT_SCALE,
          isLoading: false
        });
      } catch (error) {
        console.error('Error loading PDF:', error);
        set({ isLoading: false });
      }
    },

    // Zoom y descarga
    zoomIn: () =>
      set(state => {
        const currentIndex = ALLOWED_SCALES.findIndex(s => s >= state.scale);
        return currentIndex < ALLOWED_SCALES.length - 1
          ? { scale: ALLOWED_SCALES[currentIndex + 1] }
          : state;
      }),

    zoomOut: () =>
      set(state => {
        const currentIndex = ALLOWED_SCALES.findIndex(s => s >= state.scale);
        return currentIndex > 0 ? { scale: ALLOWED_SCALES[currentIndex - 1] } : state;
      }),

    downloadPDF: () => {
      const { src } = get();
      if (src) downloadFile(src);
    }
  };
});
