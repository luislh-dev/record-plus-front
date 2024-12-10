import { useHospitalDelete } from "./UseHospitalDelete";
import { useHospitalSearch } from "./useHospitalSearch";

/**
 * Hook para manejar la búsqueda y eliminación de hospitales
 */
export function useHospital() {
  // Inicializar búsqueda genérica
  const searchResults = useHospitalSearch();

  const deleteResults = useHospitalDelete(() => {
    searchResults.refetch();
  });

  return {
    // Propagamos todos los resultados de búsqueda
    ...searchResults,

    // Estado y acciones de eliminación
    ...deleteResults,
  };
}
