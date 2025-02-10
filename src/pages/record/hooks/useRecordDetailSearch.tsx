import { useDebounce } from '@/hooks/useDebounce';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getRecordDetailList } from '../service/recordService';
import { useSearchStoreRecordDetail } from '../store/useSearchStoreRecordDetail';

export function useRecordDetailSearch() {
  const { buildSearchParams, setRangeDate, searchTerm, setSearchTerm, rangeDate } =
    useSearchStoreRecordDetail();
  const [personId, setPersonId] = useState<string | null>(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const fetchRecordDetails = async ({ pageParam = 0 }) => {
    if (!personId) throw new Error('ID no proporcionado');
    return getRecordDetailList(personId, {
      ...buildSearchParams(),
      page: pageParam,
    });
  };

  const { data, isLoading, isError, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['recordDetail', personId, debouncedSearchTerm, rangeDate],
    queryFn: fetchRecordDetails,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => (lastPage.last ? undefined : allPages.length),
    enabled: !!personId,
  });

  const recordDetails = data?.pages.flatMap((page) => page.content) ?? [];
  const totalElements = data?.pages[0].totalElements ?? 0;
  const currentPage = data?.pages[0].number ?? 0;

  return {
    recordDetails,
    isLoading,
    isError,
    totalElements,
    currentPage,
    fetchNextPage,
    hasNextPage,
    setPersonId,
    setRangeDate,
    searchTerm,
    setSearchTerm,
  };
}
