/* eslint-disable no-console */

import { StateCreator } from 'zustand';
import { SearchMatch } from '../../types/SearchTypes';
import { PDFStore, SearchSlice } from '../../types/store.types';
import { findTextMatches } from '../../utils/findTextMatches';

export const createSearchSlice: StateCreator<PDFStore, [], [], SearchSlice> = (set, get) => ({
  searchText: '',
  searchResults: [],
  allMatches: [],
  currentMatchIndex: -1,
  isSearching: false,
  totalMatches: 0,
  isCalculatingHighlights: false,
  matchesByPage: {},

  setSearchText: text => set({ searchText: text }),

  searchInDocument: async (pdfDoc, scale) => {
    const { searchText } = get();
    if (!searchText.trim()) {
      set({
        searchResults: [],
        allMatches: [],
        currentMatchIndex: -1,
        totalMatches: 0,
        isCalculatingHighlights: false
      });
      return;
    }

    set({ isCalculatingHighlights: true });

    try {
      const matches = await findTextMatches(pdfDoc, searchText, scale);
      // Asegurarse de que los matches estén agrupados por página
      const matchesByPage = matches.reduce(
        (acc, match) => {
          if (!acc[match.pageIndex]) {
            acc[match.pageIndex] = [];
          }
          acc[match.pageIndex].push(match);
          return acc;
        },
        {} as Record<number, SearchMatch[]>
      );

      set({
        allMatches: matches,
        matchesByPage,
        totalMatches: matches.length,
        currentMatchIndex: matches.length > 0 ? 0 : -1,
        isCalculatingHighlights: false
      });
    } catch (error) {
      console.error('Error en la búsqueda:', error);
      set({
        isCalculatingHighlights: false,
        allMatches: [],
        matchesByPage: {},
        currentMatchIndex: -1,
        totalMatches: 0
      });
    }
  },

  nextMatch: () => {
    set(state => {
      const nextIndex =
        state.currentMatchIndex < state.allMatches.length - 1 ? state.currentMatchIndex + 1 : 0;

      // Encontrar la página correspondiente al siguiente match
      const nextMatch = state.allMatches[nextIndex];
      if (nextMatch) {
        const canvas = document.querySelector(`[data-page="${nextMatch.pageIndex + 1}"]`);
        canvas?.scrollIntoView({ behavior: 'auto', block: 'center' });
      }

      return { currentMatchIndex: nextIndex };
    });
  },

  previousMatch: () => {
    set(state => {
      const prevIndex =
        state.currentMatchIndex > 0 ? state.currentMatchIndex - 1 : state.allMatches.length - 1;

      // Encontrar la página correspondiente al match anterior
      const prevMatch = state.allMatches[prevIndex];
      if (prevMatch) {
        const canvas = document.querySelector(`[data-page="${prevMatch.pageIndex + 1}"]`);
        canvas?.scrollIntoView({ behavior: 'auto', block: 'center' });
      }

      return { currentMatchIndex: prevIndex };
    });
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
});
