/* eslint-disable no-console */
import { PDFDocumentProxy } from 'pdfjs-dist';
import { TextItem } from 'pdfjs-dist/types/src/display/api';
import { create } from 'zustand';
import { SearchResult } from '../types/SearchResult';
import { SearchMatch } from '../types/SearchTypes';

interface PDFSearchStore {
  searchText: string;
  searchResults: SearchResult[];
  allMatches: SearchMatch[];
  currentMatchIndex: number;
  isSearching: boolean;
  totalMatches: number;

  setSearchText: (text: string) => void;
  searchInDocument: (pdfDoc: PDFDocumentProxy, scale: number) => Promise<void>;
  nextMatch: () => void;
  previousMatch: () => void;
  clearSearch: () => void;
}

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

const normalizeText = (text: string): string => {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
    .toLowerCase()
    .trim();
};

const extractSurroundingText = (text: string, position: number, length: number): string => {
  const contextSize = 50;
  const start = Math.max(0, position - contextSize);
  const end = Math.min(text.length, position + length + contextSize);
  return text.slice(start, end);
};

export const usePDFSearchStore = create<PDFSearchStore>((set, get) => ({
  searchText: '',
  searchResults: [],
  allMatches: [],
  currentMatchIndex: -1,
  isSearching: false,
  totalMatches: 0,

  setSearchText: text => set({ searchText: text }),

  searchInDocument: async (pdfDoc: PDFDocumentProxy, scale: number) => {
    const { searchText } = get();
    if (!searchText.trim()) {
      set({
        searchResults: [],
        allMatches: [],
        currentMatchIndex: -1,
        totalMatches: 0
      });
      return;
    }

    set({ isSearching: true });

    try {
      const matches = await findTextMatches(pdfDoc, searchText, scale);

      set({
        allMatches: matches,
        totalMatches: matches.length,
        currentMatchIndex: matches.length > 0 ? 0 : -1,
        isSearching: false
      });
    } catch (error) {
      console.error('Error en la búsqueda:', error);
      set({
        isSearching: false,
        allMatches: [],
        currentMatchIndex: -1,
        totalMatches: 0
      });
    }
  },

  nextMatch: () => {
    set(state => ({
      currentMatchIndex:
        state.currentMatchIndex < state.allMatches.length - 1 ? state.currentMatchIndex + 1 : 0
    }));
  },

  previousMatch: () => {
    set(state => ({
      currentMatchIndex:
        state.currentMatchIndex > 0 ? state.currentMatchIndex - 1 : state.allMatches.length - 1
    }));
  },

  clearSearch: () => {
    set({
      searchText: '',
      searchResults: [],
      allMatches: [],
      currentMatchIndex: -1,
      totalMatches: 0,
      isSearching: false
    });
  }
}));
