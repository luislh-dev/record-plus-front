import { ENDPOINTS } from '@/constants/endpoints';
import { useDebounce } from '@/hooks/useDebounce';
import { getPageAllergies } from '@/services/allergiesService';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useSearchStore } from '../stores/searchStore';

export function useAllergiesSearch() {
  const buildSearchParams = useSearchStore((state) => state.buildSearchParams);
  const filters = useSearchStore((state) => state.filters);
  const searchTerm = useSearchStore((state) => state.searchTerm);
  const sortConfig = useSearchStore((state) => state.sortConfig);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { data, isLoading, refetch, isFetching, isPlaceholderData } = useQuery({
    queryKey: [ENDPOINTS.ALERRGIES_FIND_ALL_BY, filters, debouncedSearchTerm, sortConfig],
    queryFn: async () => getPageAllergies(buildSearchParams()),
    placeholderData: keepPreviousData,
  });

  return {
    allergies: data?.content ?? [],
    isLoading,
    isFetching,
    isPlaceholderData,
    refetch,
    pagination: {
      totalPages: data?.totalPages ?? 0,
      totalElements: data?.totalElements ?? 0,
      pageSize: data?.size ?? filters.size,
      currentPage: data?.number ?? 0,
    },
  };
}
