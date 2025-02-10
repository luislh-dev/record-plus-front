import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { downloadFile } from './DownloadFIles';

describe('downloadFile', () => {
  beforeEach(() => {
    // Mock de las funciones del DOM
    global.URL.createObjectURL = vi.fn(() => 'blob:mock-url');
    global.URL.revokeObjectURL = vi.fn();

    document.body.appendChild = vi.fn();
    document.body.removeChild = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('debe descargar un PDF con la extensión correcta', async () => {
    // Mock de fetch para un PDF
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      blob: () => Promise.resolve(new Blob(['pdf content'], { type: 'application/pdf' })),
      headers: new Headers({
        'content-type': 'application/pdf',
      }),
    });

    const result = await downloadFile('http://example.com/document.pdf');

    expect(result.success).toBe(true);
    expect(result.fileName).toMatch(/\.pdf$/);
    expect(result.contentType).toBe('application/pdf');
  });

  it('debe descargar una imagen JPG con la extensión correcta', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      blob: () => Promise.resolve(new Blob(['image content'], { type: 'image/jpeg' })),
      headers: new Headers({
        'content-type': 'image/jpeg',
      }),
    });

    const result = await downloadFile('http://example.com/image.jpg');

    expect(result.success).toBe(true);
    expect(result.fileName).toMatch(/\.jpg$/);
    expect(result.contentType).toBe('image/jpeg');
  });

  it('debe manejar URLs sin extensión', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      blob: () => Promise.resolve(new Blob(['content'], { type: 'image/png' })),
      headers: new Headers({
        'content-type': 'image/png',
      }),
    });

    const result = await downloadFile('http://example.com/image');

    expect(result.success).toBe(true);
    expect(result.fileName).toMatch(/\.png$/);
  });

  it('debe manejar errores de red', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
    });

    await expect(downloadFile('http://example.com/notfound.pdf')).rejects.toThrow('HTTP error!');
  });

  it('debe usar extensión por defecto para tipos de contenido desconocidos', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      blob: () => Promise.resolve(new Blob(['content'])),
      headers: new Headers({
        'content-type': 'application/unknown',
      }),
    });

    const result = await downloadFile('http://example.com/file');

    expect(result.fileName).toMatch(/\.pdf$/);
  });
});
