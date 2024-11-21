import { useCallback, useState } from "react";
import { HospitalCreateRequest } from "../types/HospitalCreateRequest";
import { updateHospital } from "../service/hospitalService";

export function useHospitalUpdate(onSuccess?: () => void) {
  const [updateState, setUpdateState] = useState({
    isUpdating: false,
    error: null as string | null,
  });

  const handleUpdate = useCallback(
    async (id: number, data: HospitalCreateRequest) => {
      setUpdateState({ isUpdating: true, error: null });

      try {
        await updateHospital(id, data);
        onSuccess?.(); // Avisa al componente que se actualizó correctamente
      } catch (error) {
        console.error("Error updating hospital:", error);
        setUpdateState({
          isUpdating: false,
          error: "Error al actualizar el hospital",
        });
        throw error; // Re-throw to handle in component
      } finally {
        setUpdateState((prev) => ({ ...prev, isUpdating: false }));
      }
    },
    [onSuccess]
  );

  return { updateState, handleUpdate };
}
