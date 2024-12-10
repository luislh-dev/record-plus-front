import { useDebounce } from "@/hooks/useDebounce";
import { getHospitals } from "../service/hospitalService";
import { useQuery } from "@tanstack/react-query";
import { useSearchStore } from "../stores/searchStore";

/**
 * Hook para manejar la búsqueda de hospitales
 */
export function useHospitalSearch() {
  const store = useSearchStore();

  // Aplicar debounce al término de búsqueda
  const debouncedSearchTerm = useDebounce(store.searchTerm, 300);

  // Construir parámetros de búsqueda
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [
      "hospitals",
      store.filters,
      debouncedSearchTerm,
      store.sortConfig,
    ],
    queryFn: async () => {
      const params = store.buildSearchParams();
      return getHospitals(params);
    },
  });

  return {
    hospitals: data?.content ?? [],
    isLoading,
    error,
    pagination: {
      totalPages: data?.totalPages ?? 0,
      totalElements: data?.totalElements ?? 0,
      pageSize: data?.size ?? store.filters.size,
      currentPage: data?.number ?? 0,
    },
    refetch,
  };
}
