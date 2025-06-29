import { useDebounce } from '@/hooks/useDebounce';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getRecordDetailList } from '../service/recordService';
import { useSearchStoreRecordDetail } from '../store/useSearchStoreRecordDetail';

export function useRecordDetailSearch(personId: string) {
  const { buildSearchParams, setRangeDate, searchTerm, setSearchTerm, rangeDate } =
    useSearchStoreRecordDetail();

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const fetchRecordDetails = async ({ pageParam = 0 }) => {
    const params = {
      ...buildSearchParams(),
      page: pageParam,
    };
    return getRecordDetailList(personId, params);
  };

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ['recordDetail', personId, debouncedSearchTerm, rangeDate],
    queryFn: fetchRecordDetails,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => (lastPage.last ? undefined : allPages.length),
    enabled: !!personId,
  });

  const recordDetails = data?.pages.flatMap((page) => page.content) ?? [];
  const totalElements = data?.pages[0]?.totalElements ?? 0;
  const currentPage = data?.pages[0]?.number ?? 0;

  return {
    recordDetails,
    isLoading,
    isError,
    totalElements,
    currentPage,
    fetchNextPage,
    hasNextPage,
    setRangeDate,
    searchTerm,
    setSearchTerm,
    isFetching,
  };
}
