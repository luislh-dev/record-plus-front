import { getRoles } from '@/services/rolesService';
import { useQuery } from '@tanstack/react-query';

export const useRole = () => {
  const {
    data: roles,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['roles'],
    queryFn: async () => getRoles(),
    staleTime: 1000 * 60 * 60 * 24, // 24 horas
  });

  return { roles: roles ?? [], isLoading, error };
};
