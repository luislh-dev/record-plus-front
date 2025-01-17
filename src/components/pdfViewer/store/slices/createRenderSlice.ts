/* eslint-disable no-console */
import { StateCreator } from 'zustand';
import { PDFStore, RenderSlice } from '../../types/store.types';

export const createRenderSlice: StateCreator<PDFStore, [], [], RenderSlice> = (_, get) => ({
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
  }
});
