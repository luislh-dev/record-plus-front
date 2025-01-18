/* eslint-disable no-console */

import { StateCreator } from 'zustand';
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

  setSearchText: text => set({ searchText: text }),

  searchInDocument: async (pdfDoc, scale) => {
    const { searchText } = get();
    if (!searchText.trim()) {
      set({
        searchResults: [],
        allMatches: [],
        currentMatchIndex: -1,
        totalMatches: 0,
        isCalculatingHighlights: false // Asegurar que termine
      });
      return;
    }

    set({ isCalculatingHighlights: true }); // Indicar que está procesando

    try {
      const matches = await findTextMatches(pdfDoc, searchText, scale);
      set({
        allMatches: matches,
        totalMatches: matches.length,
        currentMatchIndex: matches.length > 0 ? 0 : -1,
        isCalculatingHighlights: false // Finalizar
      });
    } catch (error) {
      console.error('Error en la búsqueda:', error);
      set({
        isCalculatingHighlights: false, // Finalizar
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
});
