import { useDebounce } from '@/hooks/useDebounce';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getPersonList } from '../services/peopleService';
import { useSearchPeopleStore } from '../stores/useSearchStore';

export function usePersonSearch() {
  const searchTerm = useSearchPeopleStore((state) => state.searchTerm);
  const filters = useSearchPeopleStore((state) => state.filters);
  const sortConfig = useSearchPeopleStore((state) => state.sortConfig);
  const buildSearchParams = useSearchPeopleStore((state) => state.buildSearchParams);

  // Aplicar debounce al término de búsqueda
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Construir parámetros de búsqueda
  const { data, isLoading, error, refetch, isFetching, isPlaceholderData } = useQuery({
    queryKey: ['people', filters, debouncedSearchTerm, sortConfig],
    queryFn: async () => {
      const params = buildSearchParams();
      return getPersonList(params);
    },
    placeholderData: keepPreviousData,
  });

  return {
    peoples: data?.content ?? [],
    isLoading,
    error,
    pagination: {
      totalPages: data?.totalPages ?? 0,
      totalElements: data?.totalElements ?? 0,
      pageSize: data?.size ?? filters.size,
      currentPage: data?.number ?? 0,
    },
    refetch,
    isFetching,
    isPlaceholderData,
  };
}
