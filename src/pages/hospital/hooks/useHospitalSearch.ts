import { useDebounce } from '@/hooks/useDebounce';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getHospitals } from '../service/hospitalService';
import { useSearchStore } from '../stores/searchStore';

/**
 * Hook para manejar la búsqueda de hospitales
 */
export function useHospitalSearch() {
  const searchTerm = useSearchStore((state) => state.searchTerm);
  const filters = useSearchStore((state) => state.filters);
  const sortConfig = useSearchStore((state) => state.sortConfig);
  const buildSearchParams = useSearchStore((state) => state.buildSearchParams);

  // Aplicar debounce al término de búsqueda
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Construir parámetros de búsqueda
  const { data, isLoading, error, refetch, isPlaceholderData, isFetching } = useQuery({
    queryKey: ['hospitals', filters, debouncedSearchTerm, sortConfig],
    queryFn: async () => {
      const params = buildSearchParams();
      return getHospitals(params);
    },
    placeholderData: keepPreviousData,
  });

  return {
    hospitals: data?.content ?? [],
    isLoading,
    isFetching,
    isPlaceholderData,
    error,
    pagination: {
      totalPages: data?.totalPages ?? 1,
      totalElements: data?.totalElements ?? 0,
      pageSize: data?.size ?? filters.size,
      currentPage: data?.number ? data.number + 1 : 1,
    },
    refetch,
  };
}
