import { getHospitals } from "../service/hospitalService";
import { HospitalListDTO } from "@/pages/hospital/types/HospitalListDTO";
import { useGenericSearch } from "@/hooks/generic/useGenericSearch";
import { HospitalSearchParams } from "../types/hospital";
import { useHospitalDelete } from "./UseHospitalDelete";

interface UseHospitalParams {
  initialPageSize?: number;
  searchDelay?: number;
}

/**
 * Hook específico para la gestión de hospitales
 * Extiende useGenericSearch con funcionalidad específica de hospitales
 */
export function useHospital({
  initialPageSize,
  searchDelay,
}: UseHospitalParams = {}) {
  // Inicializar búsqueda genérica
  const searchResults = useGenericSearch<HospitalListDTO, HospitalSearchParams>(
    {
      initialPageSize,
      searchDelay,
      fetchData: getHospitals,
    }
  );

  const deleteResults = useHospitalDelete(() => {
    searchResults.refresh();
  });

  return {
    // Propagamos todos los resultados de búsqueda
    ...searchResults,

    // Estado y acciones de eliminación
    ...deleteResults,
  };
}
