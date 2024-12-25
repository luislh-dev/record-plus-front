import { PeopleRequestParams, SearchFieldKeys } from '@/pages/people/types/PeopleRequestParams';
import { SortConfigGeneric, SortDirection } from '@/types/sorting';
import { create } from 'zustand';
import { SortablePeopleFields } from '../types/MainPeopleListDto';

interface SearchState {
  searchTerm: string;
  tempSearchTerm: string;
  sortConfig: SortConfigGeneric<SortablePeopleFields>;
  selectedSearchField: SearchFieldKeys;
  filters: PeopleRequestParams;

  setSearchTerm: (searchTerm: string) => void;
  setTempSearchTerm: (searchTerm: string) => void;
  setSortConfig: (config: SortConfigGeneric<SortablePeopleFields>) => void;
  setSelectedSearchField: (field: SearchFieldKeys) => void;
  setFilters: (filters: PeopleRequestParams) => void;
  setPage: (page: number) => void;

  buildSearchParams: () => PeopleRequestParams;
}

export const useSearchPeopleStore = create<SearchState>((set, get) => ({
  searchTerm: '',
  tempSearchTerm: '',
  sortConfig: { field: 'updatedAt', direction: SortDirection.DESC },
  selectedSearchField: 'fullName',
  filters: { page: 0, size: 20 },

  setTempSearchTerm: term => set({ tempSearchTerm: term }), // Nuevo

  setSearchTerm: term =>
    set({
      searchTerm: term,
      tempSearchTerm: term,
      filters: { ...get().filters, page: 0 }
    }),

  setSortConfig: config => set({ sortConfig: config }),

  setSelectedSearchField: field =>
    set({
      selectedSearchField: field,
      filters: { ...get().filters, page: 0 }
    }),

  setFilters: filters => set({ filters }),
  setPage: page => set({ filters: { ...get().filters, page } }),

  buildSearchParams: () => {
    const { searchTerm, filters, sortConfig } = get();
    const params: PeopleRequestParams = {
      ...filters,
      sort: `${sortConfig.field},${sortConfig.direction}`
    };

    if (searchTerm) {
      params[get().selectedSearchField] = searchTerm;
    }

    return params;
  }
}));
