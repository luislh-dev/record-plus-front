import { RefObject, useEffect, useState } from 'react';

interface PDFCanvasProps {
  canvasRef: RefObject<HTMLCanvasElement>;
}

export const PDFCanvas = ({ canvasRef }: PDFCanvasProps) => {
  const [shouldCenter, setShouldCenter] = useState(true);

  // Centrar el canvas si es más pequeño que el contenedor
  useEffect(() => {
    if (!canvasRef.current) return;

    const observer = new ResizeObserver(() => {
      const canvas = canvasRef.current;
      const container = canvas?.parentElement?.parentElement;

      if (canvas && container) {
        setShouldCenter(canvas.width < container.clientWidth);
      }
    });

    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }

    return () => observer.disconnect();
  }, [canvasRef]);

  return (
    <div className="w-full h-full overflow-auto bg-gray-100 rounded-md">
      <div className={`inline-block p-2 ${shouldCenter ? 'w-full text-center' : ''}`}>
        <canvas ref={canvasRef} className="shadow-2xl inline-block" />
      </div>
    </div>
  );
};
