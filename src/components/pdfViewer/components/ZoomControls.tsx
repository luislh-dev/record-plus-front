import { ZoomIn } from '@/icons/ZoomIn';
import { ZoomOut } from '@/icons/ZoomOut';
import { useEffect } from 'react';
import { usePDFStore } from '../store/usePDFStore';
import { ControlButton } from './common/ControlButton';

export const ZoomControls = () => {
  const zoomOut = usePDFStore((state) => state.zoomOut);
  const zoomIn = usePDFStore((state) => state.zoomIn);
  const scale = usePDFStore((state) => state.scale);

  const scalePercentage = Math.round(scale * 100);

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
    <div className='flex items-center gap-2'>
      <ControlButton onClick={zoomOut}>
        <ZoomOut className='w-5 h-5' />
      </ControlButton>
      <span className='text-sm min-w-16 text-center hidden md:block'>{scalePercentage}%</span>
      <ControlButton onClick={zoomIn}>
        <ZoomIn className='w-5 h-5' />
      </ControlButton>
    </div>
  );
};
