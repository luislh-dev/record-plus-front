import type { StateCreator } from 'zustand';
import { ALLOWED_SCALES, DEFAULT_SCALE } from '../../config/Zoom';
import type { PDFStore, ZoomSlice } from '../../types/store.types';

export const createZoomSlice: StateCreator<PDFStore, [], [], ZoomSlice> = (set) => ({
  scale: DEFAULT_SCALE,

  setScale: (scale) => set({ scale }),

  zoomIn: () =>
    set((state) => {
      const currentIndex = ALLOWED_SCALES.findIndex((s) => s >= state.scale);
      return currentIndex < ALLOWED_SCALES.length - 1
        ? { scale: ALLOWED_SCALES[currentIndex + 1] }
        : state;
    }),

  zoomOut: () =>
    set((state) => {
      const currentIndex = ALLOWED_SCALES.findIndex((s) => s >= state.scale);
      return currentIndex > 0 ? { scale: ALLOWED_SCALES[currentIndex - 1] } : state;
    }),
});
