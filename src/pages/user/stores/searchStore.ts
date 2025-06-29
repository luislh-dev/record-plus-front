import { type SortConfig, SortDirection } from '@/types/sorting';
import { create } from 'zustand';
import { SEARCH_PARAMS } from '../constants/searchParams';
import type { SearchFieldKeys, UserRequestParams } from '../types/UserRequestParams';

interface SearchState {
  // Estado
  searchTerm: string;
  sortConfig: SortConfig;
  selectedState: number | null;
  selectedRole: number | null;
  selectedSearchField: SearchFieldKeys;
  filters: UserRequestParams;

  // Acciones
  setSearchTerm: (searchTerm: string) => void;
  setSortConfig: (config: SortConfig) => void;
  setSelectedState: (stateId: number | null) => void;
  setSelectedRole: (roleId: number | null) => void;
  setSelectedSearchField: (field: SearchFieldKeys) => void;
  setFilters: (filters: UserRequestParams) => void;
  setPage: (page: number) => void;

  // Utilidades
  buildSearchParams: () => UserRequestParams;
}

export const useUserSearchStore = create<SearchState>((set, get) => ({
  searchTerm: '',
  sortConfig: { field: 'username', direction: SortDirection.DESC },
  selectedState: null,
  selectedRole: null,
  selectedSearchField: 'username',
  filters: { page: 0, size: 20 },

  setSearchTerm: (term) =>
    set({
      searchTerm: term,
      filters: { ...get().filters, page: 0 },
    }),

  setSortConfig: (config) => set({ sortConfig: config }),

  setSelectedState: (stateId) =>
    set((state) => ({
      selectedState: stateId,
      filters: {
        ...state.filters,
        stateId: stateId ?? undefined,
        page: 0,
      },
    })),

  setSelectedRole: (roleId) =>
    set((state) => ({
      selectedRole: roleId,
      filters: {
        ...state.filters,
        roleId: roleId ?? undefined,
        page: 0,
      },
    })),

  setSelectedSearchField: (field) =>
    set((state) => {
      // Limpiar el campo de búsqueda anterior del filtro
      const newFilters = { ...state.filters };

      for (const param of SEARCH_PARAMS) {
        delete newFilters[param.id];
      }

      return {
        selectedSearchField: field,
        filters: newFilters,
      };
    }),

  setFilters: (filters) => set({ filters }),

  setPage: (page) => set({ filters: { ...get().filters, page: page - 1 } }),

  buildSearchParams: () => {
    const { searchTerm, selectedState, sortConfig, selectedSearchField, filters } = get();
    const params: UserRequestParams = {
      ...filters,
      sort: `${sortConfig.field},${sortConfig.direction}`,
    };

    if (searchTerm) {
      params[selectedSearchField] = searchTerm;
    }

    if (selectedState) {
      params.stateId = selectedState;
    }

    return params;
  },
}));
