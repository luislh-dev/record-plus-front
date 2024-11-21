import { useCallback, useState } from "react";
import { HospitalCreateRequest } from "../types/HospitalCreateRequest";
import { getHospital } from "../service/hospitalService";

export function useHospitalGetBy() {
  const [getByIdState, setGetByIdState] = useState({
    isLoading: false,
    error: null as string | null,
    data: null as HospitalCreateRequest | null,
  });

  // Obtener por id
  const getById = useCallback(async (id: number) => {
    setGetByIdState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const hospital = await getHospital(id);
      setGetByIdState((prev) => ({
        ...prev,
        data: hospital,
        isLoading: false,
      }));
      return hospital;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Error al obtener el hospital";
      setGetByIdState((prev) => ({
        ...prev,
        error: message,
        isLoading: false,
      }));
      throw error;
    }
  }, []);

  return { getByIdState, getById };
}
