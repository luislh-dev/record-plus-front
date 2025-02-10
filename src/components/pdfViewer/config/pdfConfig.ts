/* eslint-disable no-console */
import * as pdfjs from 'pdfjs-dist';

export const configurePDFJS = () => {
  // Silenciar warnings específicos
  const originalConsoleWarn = console.warn;
  console.warn = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('TT: undefined function') || args[0].includes('pdf.worker.min.mjs'))
    ) {
      return;
    }
    originalConsoleWarn.apply(console, args);
  };

  // Configuración global
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
  ).toString();
};
