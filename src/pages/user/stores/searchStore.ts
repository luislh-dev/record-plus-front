import { SortConfigGeneric, SortDirection } from "@/types/sorting";
import { SortableUserFields } from "../types/UserListDTO";
import { create } from "zustand";
import { HospitalRequestParams } from "@/pages/hospital/types/HospitalRequestParams";
import { SEARCH_PARAMS } from "../constants/searchParams";
import { UserRequestParams } from "../types/UserRequestParams";

interface SearchState {
  // Estado
  searchTerm: string;
  sortConfig: SortConfigGeneric<SortableUserFields>;
  selectedState: number | null;
  searchFields: string[];
  filters: HospitalRequestParams;

  // Acciones
  setSearchTerm: (searchTerm: string) => void;
  setSortConfig: (config: SortConfigGeneric<SortableUserFields>) => void;
  setSelectedState: (stateId: number | null) => void;
  setSearchFields: (fields: string[]) => void;
  setFilters: (filters: HospitalRequestParams) => void;
  setPage: (page: number) => void;

  // Utilidades
  buildSearchParams: () => HospitalRequestParams;
}

export const useUserSearchStore = create<SearchState>((set, get) => ({
  searchTerm: "",
  sortConfig: { field: "username", direction: SortDirection.DESC },
  selectedState: null,
  searchFields: [SEARCH_PARAMS[0].id],
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
      },
    })),

  setSearchFields: (fields) => set({ searchFields: fields }),

  setFilters: (filters) => set({ filters }),

  setPage: (page) => set({ filters: { ...get().filters, page } }),

  buildSearchParams: () => {
    const { searchTerm, selectedState, sortConfig, filters } = get();
    const params: UserRequestParams = {
      ...filters,
      sort: `${sortConfig.field},${sortConfig.direction}`,
    };

    if (searchTerm) {
      params.name = searchTerm;
    }

    if (selectedState) {
      params.stateId = selectedState;
    }

    return params;
  },
}));
