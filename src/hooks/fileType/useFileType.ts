import { ONE_MONTH_IN_MS } from '@/constants/times';
import { getAllFileTypes } from '@/services/FileTypeService';
import { useQuery } from '@tanstack/react-query';

export const useFileType = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['fileType'],
    queryFn: async () => getAllFileTypes(),
    staleTime: ONE_MONTH_IN_MS,
    gcTime: ONE_MONTH_IN_MS,
  });

  return { fileTypes: data ?? [], isError, isLoading };
};
