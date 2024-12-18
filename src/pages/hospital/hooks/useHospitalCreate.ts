import { ApiServiceError } from "@/services/api/ApiErrorHandler";
import { MutationState } from "@/types/MutationState";
import { useCallback, useState } from "react";
import { toHospitalCreateRequest } from "../adapter/hospitalAdapter";
import { HospitalCreateValues } from "../models/hospitalCreateSchema";
import { createHospital } from "../service/hospitalService";

export function useHospitalCreate(onSuccess?: () => void) {
  const [createState, setCreateState] = useState<MutationState>({
    isLoading: false,
    error: null,
  });

  const handleCreate = useCallback(
    async (data: HospitalCreateValues) => {
      setCreateState({ isLoading: true, error: null });

      try {
        await createHospital(toHospitalCreateRequest(data));
        onSuccess?.();
      } catch (error) {
        if (error instanceof ApiServiceError) {
          setCreateState({
            isLoading: false,
            error: error.error,
          });
        }
        throw error;
      } finally {
        setCreateState((prev) => ({ ...prev, isCreating: false }));
      }
    },
    [onSuccess],
  );

  return { createState, handleCreate };
}
