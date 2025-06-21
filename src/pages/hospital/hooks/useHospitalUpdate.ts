import type { ApiError } from '@/types/errros/ApiError';
import { useMutation } from '@tanstack/react-query';
import { toHospitalCreateRequest } from '../adapter/hospitalAdapter';
import type { HospitalCreateValues } from '../models/hospitalCreateSchema';
import { updateHospital } from '../service/hospitalService';

export function useHospitalUpdate() {
  const mutation = useMutation<void, ApiError, { id: number; data: HospitalCreateValues }>({
    mutationFn: async ({ id, data }) => {
      await updateHospital(id, toHospitalCreateRequest(data));
    },
  });

  return {
    updateState: {
      isLoading: mutation.isPending,
      error: mutation.error ?? null,
    },
    handleUpdate: mutation.mutateAsync,
  };
}
