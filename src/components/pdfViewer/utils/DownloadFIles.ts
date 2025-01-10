/* eslint-disable no-console */
export async function downloadFile(url: string) {
  try {
    const getFileNameFromUrl = (url: string) => {
      const urlParts = url.split('/');
      const fileName = urlParts[urlParts.length - 1];

      // Lista de extensiones permitidas
      const validExtensions = ['.pdf', '.jpg', '.jpeg', '.png', '.webp'];

      // Verificar si el nombre tiene una extensión válida
      const hasValidExtension = validExtensions.some(ext => fileName.toLowerCase().endsWith(ext));

      if (hasValidExtension) {
        return decodeURIComponent(fileName);
      }

      // Intentar detectar el tipo de archivo desde la respuesta
      const extension = getExtensionFromContentType(response.headers.get('content-type'));
      const timestamp = new Date().toISOString().slice(0, 10);
      return `documento_${timestamp}${extension}`;
    };

    const getExtensionFromContentType = (contentType: string | null): string => {
      if (!contentType) return '.pdf'; // default

      const contentTypeMap: { [key: string]: string } = {
        'application/pdf': '.pdf',
        'image/jpeg': '.jpg',
        'image/png': '.png',
        'image/webp': '.webp'
      };

      return contentTypeMap[contentType.toLowerCase()] || '.pdf';
    };

    const response = await fetch(url);

    // Verificar si la respuesta es válida
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const fileName = getFileNameFromUrl(url);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);

    return {
      success: true,
      fileName,
      contentType: response.headers.get('content-type')
    };
  } catch (error) {
    console.error('Error al descargar el archivo:', error);
    throw error;
  }
}
