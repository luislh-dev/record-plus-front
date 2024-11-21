import { useCallback, useState } from "react";
import { HospitalCreateRequest } from "../types/HospitalCreateRequest";
import { createHospital } from "../service/hospitalService";

export function useHospitalCreate(onSuccess?: () => void) {
  const [createState, setCreateState] = useState({
    isCreating: false,
    error: null as string | null,
  });

  const handleCreate = useCallback(
    async (data: HospitalCreateRequest) => {
      setCreateState({ isCreating: true, error: null });

      try {
        await createHospital(data);
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
