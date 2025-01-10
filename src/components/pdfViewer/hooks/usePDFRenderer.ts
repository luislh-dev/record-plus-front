/* eslint-disable no-console */
import * as pdfjs from 'pdfjs-dist';
import { PDFDocumentProxy, RenderParameters } from 'pdfjs-dist/types/src/display/api';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ALLOWED_SCALES, DEFAULT_SCALE } from '../config/Zoom';
import { PDFRenderError } from '../types/PDFRenderError';
import { downloadFile } from '../utils/DownloadFIles';

export const usePDFRenderer = (src: string) => {
  pdfjs.GlobalWorkerOptions.workerSrc =
    'https://unpkg.com/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs';

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy>();
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(DEFAULT_SCALE);
  const renderTaskRef = useRef<pdfjs.RenderTask | null>(null);
  const initialRenderDone = useRef(false);

  const [renderedPages, setRenderedPages] = useState<number[]>([]);

  // Función para renderizar una página específica
  const renderPage = async (pageNumber: number, canvas: HTMLCanvasElement) => {
    if (!pdfDoc) return;

    try {
      const page = await pdfDoc.getPage(pageNumber);
      const viewport = page.getViewport({ scale });

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext: RenderParameters = {
        canvasContext: canvas.getContext('2d')!,
        viewport
      };

      await page.render(renderContext).promise;
      if (!renderedPages.includes(pageNumber)) {
        setRenderedPages(prev => [...prev, pageNumber]);
      }
    } catch (error) {
      console.error(`Error rendering page ${pageNumber}:`, error);
    }
  };

  // Función para encontrar el scale más cercano
  const findNearestScale = (currentScale: number): number => {
    return ALLOWED_SCALES.reduce((prev, curr) =>
      Math.abs(curr - currentScale) < Math.abs(prev - currentScale) ? curr : prev
    );
  };

  // Funciones para manejar el zoom
  const zoomIn = () => {
    const currentIndex = ALLOWED_SCALES.findIndex(s => s >= scale);
    if (currentIndex < ALLOWED_SCALES.length - 1) {
      setScale(ALLOWED_SCALES[currentIndex + 1]);
    }
  };

  const zoomOut = () => {
    const currentIndex = ALLOWED_SCALES.findIndex(s => s >= scale);
    if (currentIndex > 0) {
      setScale(ALLOWED_SCALES[currentIndex - 1]);
    }
  };

  const calculateInitialScale = useCallback((page: pdfjs.PDFPageProxy) => {
    if (!containerRef.current) return DEFAULT_SCALE;

    const viewport = page.getViewport({ scale: 1 });
    const containerWidth = containerRef.current.clientWidth;
    const containerPadding = 40;
    const rawScale = (containerWidth - containerPadding) / viewport.width;

    return findNearestScale(rawScale);
  }, []);

  // Efecto para cargar el documento PDF
  useEffect(() => {
    setIsLoading(true);
    initialRenderDone.current = false;

    const loadingTask = pdfjs.getDocument(src);
    loadingTask.promise.then(
      async loadedDoc => {
        setPdfDoc(loadedDoc);
        // Pre-cargar la primera página para calcular el scale inicial
        const firstPage = await loadedDoc.getPage(1);
        const initialScale = calculateInitialScale(firstPage);
        setScale(initialScale);
        setIsLoading(false);
      },
      error => {
        console.error('Error loading PDF:', error);
        setIsLoading(false);
      }
    );
  }, [src, calculateInitialScale]);

  // Efecto principal para renderizar la página
  useEffect(() => {
    if (isLoading) return;

    let isCurrentOperation = true;
    const renderDelay = initialRenderDone.current ? 100 : 0;

    const renderPageSafely = async () => {
      const canvas = canvasRef.current;
      if (!canvas || !pdfDoc) return;

      try {
        if (renderTaskRef.current) {
          await renderTaskRef.current.cancel();
          renderTaskRef.current = null;
        }

        if (!isCurrentOperation) return;

        const page = await pdfDoc.getPage(currentPage);
        const viewport = page.getViewport({ scale });

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        if (!isCurrentOperation) return;

        const renderContext: RenderParameters = {
          canvasContext: canvas.getContext('2d')!,
          viewport
        };

        renderTaskRef.current = page.render(renderContext);
        await renderTaskRef.current.promise;
        initialRenderDone.current = true;
      } catch (error: unknown) {
        if (
          error instanceof Error &&
          (error as PDFRenderError).name !== 'RenderingCancelledException'
        ) {
          console.error('Error rendering PDF:', error);
        }
      }
    };

    // Retrasar el renderizado para evitar renderizar en cada cambio de página
    const timer = setTimeout(renderPageSafely, renderDelay);

    return () => {
      isCurrentOperation = false;
      clearTimeout(timer);
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
      }
    };
  }, [pdfDoc, currentPage, scale, isLoading]);

  // Efecto para observar cambios en el tamaño del contenedor
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      if (pdfDoc) {
        const timer = setTimeout(() => {
          if (renderTaskRef.current) {
            renderTaskRef.current.cancel();
          }
          // El renderizado se manejará a través del efecto principal
          setScale(prevScale => prevScale); // Esto forzará un re-render
        }, 100);
        return () => clearTimeout(timer);
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, [pdfDoc]);

  const nextPage = () => pdfDoc && currentPage < pdfDoc.numPages && setCurrentPage(currentPage + 1);

  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  const downloadPDF = async () => downloadFile(src);

  return {
    canvasRef,
    containerRef,
    pdfDoc,
    currentPage,
    scale,
    isLoading,
    setCurrentPage,
    nextPage,
    prevPage,
    zoomIn,
    zoomOut,
    downloadPDF,

    // Funciones de renderizado de páginas
    renderPage,
    renderedPages
  };
};
