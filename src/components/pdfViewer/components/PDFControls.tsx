import { Download } from '@/icons/Download';
import { usePDFStore } from '../store/usePDFStore';
import { ControlButton } from './common/ControlButton';
import { NavigationControls } from './NavigationControls';
import { PropoverSearch } from './PopoverSearch';
import { ZoomControls } from './ZoomControls';

export const PDFControls = () => {
  const downloadPDF = usePDFStore(state => state.downloadPDF);

  return (
    <div className="flex items-center justify-between">
      <div className="flex  justify-between w-full items-center gap-4">
        {/* Navigation */}
        <div className="flex items-center gap-2">
          <PropoverSearch />
          <NavigationControls />
        </div>

        {/* Zoom */}
        <ZoomControls />

        {/* Download */}
        <ControlButton onClick={downloadPDF}>
          <Download className="w-5 h-5" />
        </ControlButton>
      </div>
    </div>
  );
};
