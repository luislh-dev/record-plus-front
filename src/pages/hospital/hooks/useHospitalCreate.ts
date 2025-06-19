import type { ApiError } from '@/types/errros/ApiError';
import { useMutation } from '@tanstack/react-query';
import { toHospitalCreateRequest } from '../adapter/hospitalAdapter';
import type { HospitalCreateValues } from '../models/hospitalCreateSchema';
import { createHospital } from '../service/hospitalService';

export function useHospitalCreate() {
  const mutation = useMutation<void, ApiError, HospitalCreateValues>({
    mutationFn: async (data) => {
      await createHospital(toHospitalCreateRequest(data));
    },
  });

  return {
    createState: {
      isLoading: mutation.isPending,
      error: mutation.error ?? null,
    },
    handleCreate: mutation.mutateAsync,
  };
}
