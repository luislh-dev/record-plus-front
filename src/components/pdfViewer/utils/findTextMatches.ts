import { PDFDocumentProxy } from 'pdfjs-dist';
import { TextItem } from 'pdfjs-dist/types/src/display/api';
import { SearchMatch } from '../types/SearchTypes';
import { normalizeText } from './normalizeText';

const extractSurroundingText = (text: string, position: number, length: number): string => {
  const contextSize = 50;
  const start = Math.max(0, position - contextSize);
  const end = Math.min(text.length, position + length + contextSize);
  return text.slice(start, end);
};

export const findTextMatches = async (
  pdfDoc: PDFDocumentProxy,
  searchTerm: string,
  scale: number
): Promise<SearchMatch[]> => {
  const matches: SearchMatch[] = [];
  const normalizedSearchTerm = normalizeText(searchTerm);

  for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
    const page = await pdfDoc.getPage(pageNum);
    const viewport = page.getViewport({ scale });

    const textContent = await page.getTextContent({
      includeMarkedContent: true
    });

    for (const item of textContent.items) {
      if (!('str' in item)) continue;

      const textItem = item as TextItem;
      const normalizedText = normalizeText(textItem.str);
      let index = 0;

      while ((index = normalizedText.indexOf(normalizedSearchTerm, index)) !== -1) {
        // Obtener posición base
        const [baseX, baseY] = viewport.convertToViewportPoint(
          textItem.transform[4],
          textItem.transform[5]
        );

        // Calcular dimensiones
        const fontSize = Math.abs(textItem.transform[3]) * scale;
        const height = fontSize;

        // Calcular ancho aproximado
        const charWidth = (textItem.width * scale) / textItem.str.length;
        const width = charWidth * searchTerm.length;

        // Calcular desplazamiento X basado en el índice
        const xOffset = index * charWidth;

        matches.push({
          pageIndex: pageNum - 1,
          text: textItem.str.substr(index, searchTerm.length),
          position: {
            x: baseX + xOffset,
            y: baseY - height,
            width,
            height: height * 1.2
          },
          surroundingText: extractSurroundingText(textItem.str, index, searchTerm.length),
          fontInfo: {
            size: fontSize,
            name: textItem.fontName || 'unknown'
          }
        });

        index += normalizedSearchTerm.length;
      }
    }
  }

  return matches.sort((a, b) => {
    if (a.pageIndex !== b.pageIndex) return a.pageIndex - b.pageIndex;
    if (Math.abs(a.position.y - b.position.y) > 10) return b.position.y - a.position.y;
    return a.position.x - b.position.x;
  });
};
