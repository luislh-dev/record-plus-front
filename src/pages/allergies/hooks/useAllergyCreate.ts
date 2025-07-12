import { createAllergy } from '@/services/allergiesService';
import type { ApiError } from '@/types/errros/ApiError';
import { useMutation } from '@tanstack/react-query';
import { allergyCreateToDTO } from '../mappers/AllergyCreateMapper';
import type { AllergyCreateValues } from '../models/allergyCreateSchema';

export function useAllergyCreate() {
  const mutation = useMutation<void, ApiError, AllergyCreateValues>({
    mutationFn: async (data) => {
      await createAllergy(allergyCreateToDTO(data));
    },
  });

  return {
    state: {
      isLoading: mutation.isPending,
      error: mutation.error ?? null,
    },
    handleCreate: mutation.mutateAsync,
  };
}
