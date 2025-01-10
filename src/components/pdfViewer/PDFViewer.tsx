import { useEffect } from 'react';
import { PDFCanvas } from './components/PDFCanvas';
import { PDFControls } from './components/PDFControls';
import { configurePDFJS } from './config/pdfConfig';
import { usePDFStore } from './store/usePDFStore';
import type { PDFViewerProps } from './types/PDFViewerProps';

export const PDFViewer = ({ src }: PDFViewerProps) => {
  const { isLoading, initialize } = usePDFStore();

  // Configurar PDF.js una vez al montar el componente
  useEffect(() => {
    configurePDFJS();
  }, []);

  // Inicializar el PDF cuando cambia la fuente
  useEffect(() => {
    initialize(src);
  }, [src, initialize]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <div
        className="w-full bg-gray-200 rounded-lg shadow-2xl p-4"
        style={
          {
            height: 'var(--pdf-container-height)',
            '--pdf-container-height': '800px'
          } as React.CSSProperties
        }
      >
        {isLoading ? (
          <div className="w-full h-64 flex items-center justify-center">
            <span className="text-gray-500">Cargando PDF...</span>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <PDFControls />
            <div className="flex-1 w-full h-[calc(100%-48px)] ">
              <PDFCanvas />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
