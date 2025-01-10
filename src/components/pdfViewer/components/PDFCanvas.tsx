import { RefObject } from 'react';

interface PDFCanvasProps {
  canvasRef: RefObject<HTMLCanvasElement>;
}

export const PDFCanvas = ({ canvasRef }: PDFCanvasProps) => {
  return (
    <div className="w-full overflow-auto flex justify-center bg-gray-100 rounded-md">
      <div className="min-w-fit p-2 shadow-2xl">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};
