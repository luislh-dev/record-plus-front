import { useQuery } from '@tanstack/react-query';
import { gerRecordDetailById } from '../service/recordService';

export function useRecordDetailById(id: string) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['recordDetail', id],
    queryFn: () => gerRecordDetailById(id),
    enabled: !!id
  });

  return {
    recordDetail: data,
    isLoading,
    isError
  };
}
