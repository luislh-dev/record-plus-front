import { useCallback, useState } from "react";
import { createHospital } from "../service/hospitalService";
import { HospitalCreateValues } from "../models/hospitalCreateSchema";
import { toHospitalCreateRequest } from "../adapter/hospitalAdapter";

export function useHospitalCreate(onSuccess?: () => void) {
  const [createState, setCreateState] = useState({
    isCreating: false,
    error: null as string | null,
  });

  const handleCreate = useCallback(
    async (data: HospitalCreateValues) => {
      setCreateState({ isCreating: true, error: null });

      try {
        await createHospital(toHospitalCreateRequest(data));
        onSuccess?.();
      } catch (error) {
        console.error("Error creating hospital:", error);
        setCreateState({
          isCreating: false,
          error: "Error al crear el hospital",
        });
        throw error;
      } finally {
        setCreateState((prev) => ({ ...prev, isCreating: false }));
      }
    },
    [onSuccess]
  );

  return { createState, handleCreate };
}
