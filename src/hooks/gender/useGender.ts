import { ONE_MONTH_IN_MS } from '@/constants/times';
import { getGender } from '@/services/GenderService';
import { useQuery } from '@tanstack/react-query';

export const useGender = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['gender'],
    queryFn: async () => getGender(),
    staleTime: ONE_MONTH_IN_MS,
    gcTime: ONE_MONTH_IN_MS
  });

  return { gender: data ?? [], isError, isLoading };
};
