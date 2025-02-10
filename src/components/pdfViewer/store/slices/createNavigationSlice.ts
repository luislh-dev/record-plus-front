import type { StateCreator } from 'zustand';
import type { NavigationSlice, PDFStore } from '../../types/store.types';

export const createNavigationSlice: StateCreator<PDFStore, [], [], NavigationSlice> = (
  set,
  get,
) => ({
  currentPage: 1,
  isControlChange: false,
  lastControlChange: 0,
  initialLoad: true,

  setIsControlChange: (value) => set({ isControlChange: value }),

  setInitialLoad: (value) => set({ initialLoad: value }),

  setCurrentPage: (page, source) => {
    const { pdfDoc, currentPage, lastControlChange } = get();
    if (page === currentPage) return;
    if (!pdfDoc || page < 1 || page > pdfDoc.numPages) return;

    set({
      currentPage: page,
      isControlChange: source === 'control' || source === 'input',
      lastControlChange:
        source === 'control' || source === 'input' ? Date.now() : lastControlChange,
    });
  },

  handlePageChange: (page, source) => {
    const { setCurrentPage } = get();
    setCurrentPage(page, source);
  },
});
