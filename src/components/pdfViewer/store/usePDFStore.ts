/* eslint-disable no-console */

import * as pdfjs from 'pdfjs-dist';
import { create } from 'zustand';
import { DEFAULT_SCALE } from '../config/Zoom';
import { configurePDFJS } from '../config/pdfConfig';
import type { PDFStore } from '../types/store.types';
import { downloadFile } from '../utils/DownloadFIles';
import { createBasePDFSlice } from './slices/baseSlice';
import { createNavigationSlice } from './slices/createNavigationSlice';
import { createRenderSlice } from './slices/createRenderSlice';
import { createSearchSlice } from './slices/searchSlice';
import { createZoomSlice } from './slices/zoomSlice';

export const usePDFStore = create<PDFStore>((set, get, api) => {
  configurePDFJS();

  const baseSlice = createBasePDFSlice(set, get, api);
  const navigationSlice = createNavigationSlice(set, get, api);
  const zoomSlice = createZoomSlice(set, get, api);
  const renderSlice = createRenderSlice(set, get, api);
  const searchSlice = createSearchSlice(set, get, api);

  return {
    ...baseSlice,
    ...navigationSlice,
    ...zoomSlice,
    ...renderSlice,
    ...searchSlice,

    initialize: async (src, scale) => {
      const store = get();
      store.setSrc(src);
      store.setLoading(true);
      store.setInitialLoad(true);

      try {
        const loadingTask = pdfjs.getDocument({
          url: src,
          useSystemFonts: true,
          verbosity: 0,
        });

        const loadedDoc = await loadingTask.promise;
        store.setPdfDoc(loadedDoc);
        store.setScale(scale ?? DEFAULT_SCALE);
        store.setLoading(false);
      } catch (error) {
        console.error('Error loading PDF:', error);
        store.setLoading(false);
      }
    },

    downloadPDF: () => {
      const { src } = get();
      if (src) downloadFile(src);
    },
  };
});
