import { type SortConfig, SortDirection } from '@/types/sorting';
import { create } from 'zustand';
import type { AllergyPageParams } from '../types/AllergyPageParams';

interface SearchState {
  searchTerm: string;
  sortConfig: SortConfig;
  filters: AllergyPageParams;

  setSearchTerm: (searchTerm: string) => void;
  setSortConfig: (config: SortConfig) => void;
  setPage: (page: number) => void;

  buildSearchParams: () => AllergyPageParams;
}

export const useSearchStore = create<SearchState>((set, get) => ({
  searchTerm: '',
  sortConfig: { field: 'updatedAt', direction: SortDirection.DESC },
  filters: { page: 0, size: 20 },

  setSearchTerm: (term) => set({ searchTerm: term, filters: { ...get().filters, page: 0 } }),

  setSortConfig: (config) => set({ sortConfig: config }),

  setPage: (page) => set({ filters: { ...get().filters, page } }),

  buildSearchParams: () => {
    const { searchTerm, filters, sortConfig } = get();
    const params: AllergyPageParams = {
      ...filters,
      sort: `${sortConfig.field},${sortConfig.direction}`,
    };

    if (searchTerm) {
      params.name = searchTerm;
    }

    return params;
  },
}));
