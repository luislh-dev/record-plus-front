import { useDebounce } from '@/hooks/useDebounce';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getHospital, getHospitalsByName } from '../service/hospitalService';
import type { HospitalFindByNameParams } from '../types/HospitalRequestParams';

export function useHospitalGetBy(id: number) {
  const query = useQuery({
    queryKey: ['hospitalGetById', id],
    queryFn: () => getHospital(id),
    enabled: true,
  });

  return {
    getByIdState: {
      isLoading: query.isLoading,
      error: query.error?.message,
      data: query.data,
    },
  };
}

export function useHospitalGetByName() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const fetchHospitals = async ({ pageParam = 0 }) => {
    const params: HospitalFindByNameParams = {
      name: debouncedSearchTerm,
      size: 10,
      page: pageParam,
    };
    return getHospitalsByName(params);
  };

  const { data, isError, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['hospitalsName', debouncedSearchTerm],
    queryFn: fetchHospitals,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => (lastPage.last ? undefined : allPages.length),
  });

  const hospitals = data?.pages.flatMap((page) => page.content) ?? [];

  return {
    isLoading,
    hasNextPage,
    fetchNextPage,
    isError,
    hospitals,
    searchTerm,
    setSearchTerm,
  };
}
