import { ThumbnailBard } from '@/icons/ThumbnailBard';
import { useEffect } from 'react';
import { PDFCanvas } from './components/PDFCanvas';
import { PDFControls } from './components/PDFControls';

import { usePDFStore } from './store/usePDFStore';
import type { PDFViewerProps } from './types/PDFViewerProps';

export const PDFViewer = ({ src }: PDFViewerProps) => {
  const isLoading = usePDFStore((state) => state.isLoading);
  const initialize = usePDFStore((state) => state.initialize);
  const clearSearch = usePDFStore((state) => state.clearSearch);

  // Inicializar el PDF cuando cambia la fuente
  useEffect(() => {
    // Pasar scale si la pantalla es pequeña
    const scaleInitial = window.innerWidth < 768 ? 0.5 : undefined;

    initialize(src, scaleInitial);

    // Limpiar la búsqueda al cambiar de documento
    return () => {
      clearSearch();
    };
  }, [src, initialize, clearSearch]);

  return (
    <div className='w-full max-w-5xl mx-auto'>
      <div className='w-full bg-gray-200 rounded-lg shadow-2xl h-[calc(100vh-64px)] max-h-[1600px]'>
        {isLoading ? (
          <div className='w-full h-64 flex items-center justify-center'>
            <span className='text-gray-500'>Cargando PDF...</span>
          </div>
        ) : (
          <div className='h-full flex flex-col overflow-hidden'>
            {/* Fila de controles - altura fija */}
            <div className='flex-none w-full p-2'>
              <PDFControls />
            </div>

            {/* Área de contenido - altura flexible */}
            <div className='flex flex-1 min-h-0 overflow-hidden'>
              {/* Barra lateral estrecha */}
              <aside className='flex-none w-10 bg-gray-200'>
                <div className='w-full h-full flex flex-col items-center p-1'>
                  <button
                    className='h-7 w-7 p-1 bg-inherit rounded-md hover:enabled:bg-gray-300'
                    type='button'
                  >
                    <ThumbnailBard className='w-5 h-5' />
                  </button>
                </div>
              </aside>

              {/* Contenedor del canvas */}
              <div className='flex-1 relative overflow-hidden'>
                <PDFCanvas />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
