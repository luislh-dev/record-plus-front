import { ENDPOINTS } from '@/constants/endpoints';
import { createAllergy } from '@/services/allergiesService';
import type { ApiError } from '@/types/errros/ApiError';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { allergyCreateToDTO } from '../mappers/AllergyCreateMapper';
import type { AllergyCreateValues } from '../models/allergyCreateSchema';

export function useAllergyCreate() {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, ApiError, AllergyCreateValues>({
    mutationFn: async (data) => await createAllergy(allergyCreateToDTO(data)),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ENDPOINTS.ALERRGIES_FIND_ALL_BY],
      });
    },
  });

  return {
    state: {
      isLoading: mutation.isPending,
      error: mutation.error ?? null,
      isSuccess: mutation.isSuccess,
    },
    handleCreate: mutation.mutateAsync,
  };
}
