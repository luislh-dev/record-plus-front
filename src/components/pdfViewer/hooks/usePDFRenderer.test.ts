// usePDFRenderer.test.ts
import { act, renderHook, waitFor } from '@testing-library/react';
import * as pdfjs from 'pdfjs-dist';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ALLOWED_SCALES } from '../config/Zoom';
import { usePDFRenderer } from './usePDFRenderer';

// Mock pdfjs
vi.mock('pdfjs-dist', () => {
  const mockViewport = {
    height: 800,
    width: 600
  };

  const mockPage = {
    getViewport: vi.fn(() => mockViewport),
    render: vi.fn(() => ({
      promise: Promise.resolve()
    }))
  };

  const mockPdfDocument = {
    numPages: 3,
    getPage: vi.fn(() => Promise.resolve(mockPage)),
    destroy: vi.fn()
  };

  return {
    getDocument: vi.fn(() => ({
      promise: Promise.resolve(mockPdfDocument)
    })),
    GlobalWorkerOptions: {
      workerSrc: ''
    }
  };
});

// Mock ResizeObserver
const mockResizeObserver = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}));

window.ResizeObserver = mockResizeObserver as unknown as typeof ResizeObserver;

const mockContext = {
  rect: vi.fn()
  // Añade aquí otros métodos que necesites del contexto
} as unknown as CanvasRenderingContext2D;

const getContextMock = vi.fn().mockReturnValue(mockContext);

describe('usePDFRenderer', () => {
  const mockSrc = 'test.pdf';
  let mockCanvas: HTMLCanvasElement;
  let mockContainer: HTMLDivElement;

  beforeEach(() => {
    // Mock canvas and container refs
    mockCanvas = document.createElement('canvas');
    mockContainer = document.createElement('div');
    Object.defineProperty(mockContainer, 'clientWidth', { value: 800 });

    // Mock getContext
    mockCanvas.getContext = getContextMock;

    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('debe manejar errores durante la carga del PDF', async () => {
    const errorMessage = 'Error al cargar PDF';

    // Creamos un mock completo que implementa PDFDocumentLoadingTask
    const mockLoadingTask = {
      promise: Promise.reject(new Error(errorMessage)),
      _capability: {},
      _transport: {},
      _worker: {},
      docId: 'test-doc-id',
      onPassword: vi.fn(),
      onProgress: vi.fn(),
      destroy: vi.fn(),
      destroyed: false
    };

    vi.spyOn(pdfjs, 'getDocument').mockImplementationOnce(() => mockLoadingTask);

    const consoleErrorSpy = vi.spyOn(console, 'error');
    const { result } = renderHook(() => usePDFRenderer(mockSrc));
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error loading PDF:', expect.any(Error));
  });

  it('debe actualizar isLoading después de cargar el PDF', async () => {
    const { result } = renderHook(() => usePDFRenderer(mockSrc));

    // Esperamos a que se complete la carga del PDF
    await waitFor(() => {});

    // Verificamos que isLoading sea false después de la carga
    expect(result.current.isLoading).toBe(false);
    expect(result.current.currentPage).toBe(1);
    expect(pdfjs.getDocument).toHaveBeenCalledWith(mockSrc);
  });

  it('debe cargar el PDF correctamente', async () => {
    const { result } = renderHook(() => usePDFRenderer(mockSrc));

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(pdfjs.getDocument).toHaveBeenCalledWith(mockSrc);
    expect(result.current.isLoading).toBe(false);
  });

  it('debe manejar la navegación entre páginas correctamente', async () => {
    const { result } = renderHook(() => usePDFRenderer(mockSrc));

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    act(() => {
      result.current.nextPage();
    });
    expect(result.current.currentPage).toBe(2);

    act(() => {
      result.current.prevPage();
    });
    expect(result.current.currentPage).toBe(1);
  });

  it('debe manejar el zoom correctamente', async () => {
    const { result } = renderHook(() => usePDFRenderer(mockSrc));

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    const initialScale = result.current.scale;
    const initialScaleIndex = ALLOWED_SCALES.findIndex(s => s >= initialScale);

    act(() => {
      result.current.zoomIn();
    });
    expect(result.current.scale).toBe(ALLOWED_SCALES[initialScaleIndex + 1]);

    act(() => {
      result.current.zoomOut();
    });
    expect(result.current.scale).toBe(ALLOWED_SCALES[initialScaleIndex]);
  });

  it('no debe permitir navegar más allá de los límites del documento', async () => {
    const { result } = renderHook(() => usePDFRenderer(mockSrc));

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    act(() => {
      result.current.prevPage();
    });
    expect(result.current.currentPage).toBe(1);

    act(() => {
      result.current.setCurrentPage(3);
    });

    act(() => {
      result.current.nextPage();
    });
    expect(result.current.currentPage).toBe(3);
  });
});
