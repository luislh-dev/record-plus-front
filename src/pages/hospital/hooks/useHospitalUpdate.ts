import { useCallback, useState } from 'react';
import { HospitalCreateRequest } from '../types/HospitalCreateRequest';
import { updateHospital } from '../service/hospitalService';
import { MutationState } from '@/types/MutationState';
import { ApiServiceError } from '@/services/api/ApiErrorHandler';

export function useHospitalUpdate(onSuccess?: () => void) {
  const [updateState, setUpdateState] = useState<MutationState>({
    isLoading: false,
    error: null
  });

  const handleUpdate = useCallback(
    async (id: number, data: HospitalCreateRequest) => {
      setUpdateState({ isLoading: true, error: null });

      try {
        await updateHospital(id, data);
        onSuccess?.(); // Avisa al componente que se actualizó correctamente
      } catch (error) {
        if (error instanceof ApiServiceError) {
          setUpdateState({
            isLoading: false,
            error: error.error
          });
        }
        throw error;
      } finally {
        setUpdateState(prev => ({ ...prev, isLoading: false }));
      }
    },
    [onSuccess]
  );

  return { updateState, handleUpdate };
}
