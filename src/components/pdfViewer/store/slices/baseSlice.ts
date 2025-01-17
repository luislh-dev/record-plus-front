import { StateCreator } from 'zustand';
import { BasePDFSlice, PDFStore } from '../../types/store.types';

export const createBasePDFSlice: StateCreator<PDFStore, [], [], BasePDFSlice> = set => ({
  pdfDoc: null,
  src: null,
  isLoading: true,

  setSrc: src => set({ src }),
  setPdfDoc: doc => set({ pdfDoc: doc }),
  setLoading: isLoading => set({ isLoading })
});
