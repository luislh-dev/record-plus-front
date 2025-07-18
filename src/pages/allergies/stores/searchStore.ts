import { type SortConfig, SortDirection } from '@/types/sorting';
import { create } from 'zustand';
import type { AllergyPageParams, searchParams } from '../types/AllergyPageParams';

interface SearchState {
  searchTerm: string;
  searchField: searchParams;
  sortConfig: SortConfig;
  filters: AllergyPageParams;

  setSearchTerm: (searchTerm: string) => void;
  setSearchField: (field: searchParams) => void;
  setSortConfig: (config: SortConfig) => void;
  setFilters: (filters: Partial<AllergyPageParams>) => void;
  setPage: (page: number) => void;

  buildSearchParams: () => AllergyPageParams;
}

const DEFAULT_FILTERS: AllergyPageParams = { page: 0, size: 20 };
const DEFAULT_SORT: SortConfig = { field: 'updatedAt', direction: SortDirection.DESC };

export const useSearchStore = create<SearchState>((set, get) => ({
  searchTerm: '',
  searchField: 'name',
  sortConfig: DEFAULT_SORT,
  filters: DEFAULT_FILTERS,

  setSearchTerm: (term) => set({ searchTerm: term.trim(), filters: { ...get().filters, page: 0 } }),

  setSearchField: (field) => set({ searchField: field, filters: { ...get().filters, page: 0 } }),

  setSortConfig: (config) => set({ sortConfig: config }),

  setFilters: (filters) => {
    const currentFilters = get().filters;
    set({
      filters: {
        ...currentFilters,
        ...filters,
        page: 0,
      },
    });
  },

  setPage: (page) => set({ filters: { ...get().filters, page } }),

  buildSearchParams: () => {
    const { searchTerm, searchField, filters, sortConfig } = get();
    const params: AllergyPageParams = {
      ...filters,
      sort: `${sortConfig.field},${sortConfig.direction}`,
      name: null,
      code: null,
    };

    if (searchTerm) {
      params[searchField] = searchTerm;
    }

    return params;
  },
}));
