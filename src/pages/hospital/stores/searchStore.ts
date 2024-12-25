import { SortConfig, SortDirection } from '@/types/sorting';
import { create } from 'zustand';
import { SEARCH_PARAMS } from '../constants/searchParams';
import { HospitalRequestParams } from '../types/HospitalRequestParams';

interface SearchState {
  // Estado
  searchTerm: string;
  sortConfig: SortConfig;
  selectedState: number | null;
  searchFields: string[];
  filters: HospitalRequestParams;

  // Acciones
  setSearchTerm: (searchTerm: string) => void;
  setSortConfig: (config: SortConfig) => void;
  setSelectedState: (stateId: number | null) => void;
  setSearchFields: (fields: string[]) => void;
  setFilters: (filters: HospitalRequestParams) => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;

  // Utilidades
  buildSearchParams: () => HospitalRequestParams;
}

export const useSearchStore = create<SearchState>((set, get) => ({
  // Estado inicial
  searchTerm: '',
  sortConfig: { field: 'updatedAt', direction: SortDirection.DESC },
  selectedState: null,
  searchFields: [SEARCH_PARAMS[0].id],
  filters: { page: 0, size: 20 },

  // Acciones
  setSearchTerm: term =>
    set({
      searchTerm: term,
      filters: { ...get().filters, page: 0 }
    }),

  setSortConfig: config => set({ sortConfig: config }),

  setSelectedState: stateId =>
    set(state => ({
      selectedState: stateId,
      filters: {
        ...state.filters,
        stateId: stateId ?? undefined
      }
    })),

  setSearchFields: fields => set({ searchFields: fields }),

  setFilters: filters => set({ filters }),

  setPage: page => set({ filters: { ...get().filters, page } }),

  setPageSize: size => set({ filters: { ...get().filters, size } }),

  // Utilidades
  // Función para construir los parámetros de búsqueda
  buildSearchParams: () => {
    const state = get();
    const params: HospitalRequestParams = {
      ...state.filters,
      sort: `${state.sortConfig.field},${state.sortConfig.direction}`
    };

    if (state.searchTerm) {
      state.searchFields.forEach(field => {
        if (SEARCH_PARAMS.some(param => param.id === field)) {
          if (field === 'id') {
            const numericId = parseInt(state.searchTerm);
            if (!isNaN(numericId)) {
              params.id = numericId;
            }
          } else if (field === 'ruc' || field === 'name') {
            params[field] = state.searchTerm;
          }
        }
      });
    }

    return params;
  }
}));
