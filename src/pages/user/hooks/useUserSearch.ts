import { useDebounce } from '@/hooks/useDebounce';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getUsers } from '../service/userService';
import { useUserSearchStore } from '../stores/searchStore';

export function useUserSearch() {
  const searchTerm = useUserSearchStore((state) => state.searchTerm);
  const filters = useUserSearchStore((state) => state.filters);
  const sortConfig = useUserSearchStore((state) => state.sortConfig);
  const buildSearchParams = useUserSearchStore((state) => state.buildSearchParams);

  // Aplicar debounce al término de búsqueda
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Construir parámetros de búsqueda
  const { data, isLoading, error, refetch, isPlaceholderData, isFetching } = useQuery({
    queryKey: ['users', filters, debouncedSearchTerm, sortConfig],
    queryFn: async () => {
      const params = buildSearchParams();
      return getUsers(params);
    },
    placeholderData: keepPreviousData,
  });

  return {
    users: data?.content ?? [],
    isLoading,
    isFetching,
    isPlaceholderData,
    error,
    pagination: {
      totalPages: data?.totalPages ?? 0,
      totalElements: data?.totalElements ?? 0,
      pageSize: data?.size ?? filters.size,
      currentPage: data?.number ? data.number + 1 : 1,
    },
    refetch,
  };
}
