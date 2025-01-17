import { Download } from '@/icons/Download';
import { ZoomIn } from '@/icons/ZoomIn';
import { ZoomOut } from '@/icons/ZoomOut';
import { useEffect } from 'react';
import { usePDFStore } from '../store/usePDFStore';
import { ControlButton } from './common/ControlButton';
import { NavigationControls } from './NavigationControls';
import { PropoverSearch } from './PopoverSearch';

export const PDFControls = () => {
  const { scale, zoomIn, zoomOut, downloadPDF } = usePDFStore();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;

      switch (e.key) {
        case '+':
        case '=':
          e.preventDefault();
          zoomIn();
          break;
        case '-':
          e.preventDefault();
          zoomOut();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [zoomIn, zoomOut]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex  justify-between w-full items-center gap-4">
        {/* Navigation */}
        <div className="flex items-center gap-2">
          <PropoverSearch />
          <NavigationControls />
        </div>

        {/* Zoom */}
        <div className="flex items-center gap-2">
          <ControlButton onClick={zoomOut}>
            <ZoomOut className="w-5 h-5" />
          </ControlButton>
          <span className="text-sm min-w-16 text-center hidden md:block">
            {Math.round(scale * 100)}%
          </span>
          <ControlButton onClick={zoomIn}>
            <ZoomIn className="w-5 h-5" />
          </ControlButton>
        </div>

        {/* Download */}
        <ControlButton onClick={downloadPDF}>
          <Download className="w-5 h-5" />
        </ControlButton>
      </div>
    </div>
  );
};
