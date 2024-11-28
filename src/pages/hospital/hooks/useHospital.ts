import { useHospitalDelete } from "./UseHospitalDelete";
import { useHospitalSearch } from "./useHospitalSearch";

interface UseHospitalParams {
  initialPageSize?: number;
  searchDelay?: number;
}

/**
 * Hook para manejar la búsqueda y eliminación de hospitales
 */
export function useHospital({
  initialPageSize,
  searchDelay,
}: UseHospitalParams = {}) {
  // Inicializar búsqueda genérica
  const searchResults = useHospitalSearch({
    initialPageSize,
    searchDelay,
  });

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
