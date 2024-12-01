import { useDebounce } from "@/hooks/useDebounce";
import { PaginationState } from "@/types/Pagination";
import { useState, useCallback, useEffect } from "react";
import { HospitalSearchParams } from "../types/hospital";
import { HospitalListDTO } from "../types/HospitalListDTO";
import { getHospitals } from "../service/hospitalService";
import { useSort } from "@/hooks/useSort";
import {
  HOSPITAL_SORTABLE_FIELDS,
  HospitalSortField,
} from "../constants/sortableFields";

interface UseHospitalParams {
  initialPageSize?: number;
  searchDelay?: number;
  initialFilters?: Partial<HospitalSearchParams>;
}

// Campos válidos para búsqueda
type SearchableFields = keyof Pick<HospitalSearchParams, "name" | "ruc" | "id">;

/**
 * Verifica si un campo es válido para búsqueda
 * @param field Campo a verificar
 * @returns Si el campo es válido
 */
function isValidSearchField(field: string): field is SearchableFields {
  return ["name", "ruc", "id"].includes(field);
}

/**
 * Hook para manejar la búsqueda de hospitales
 */
export function useHospitalSearch({
  initialPageSize = 20,
  searchDelay = 300,
  initialFilters = {},
}: UseHospitalParams = {}) {
  // Estados principales
  const { sortConfig, handleSort, getSortQuery } = useSort<HospitalSortField>({
    defaultField: "updatedAt",
    defaultDirection: "desc",
    sortableFields: Object.keys(
      HOSPITAL_SORTABLE_FIELDS
    ) as HospitalSortField[],
  });

  const [data, setData] = useState<HospitalListDTO[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setState] = useState<number | null>(null);
  const [searchFields, setSearchFields] = useState<string[]>(["name"]);

  // Configuración de paginación
  const [pagination, setPagination] = useState<PaginationState>({
    totalPages: 0,
    totalElements: 0,
    pageSize: initialPageSize,
    currentPage: 0,
  });

  // Aplicar debounce al término de búsqueda
  const debouncedSearchTerm = useDebounce(searchTerm, searchDelay);

  // Estado unificado de filtros
  const [filters, setFilters] = useState<Partial<HospitalSearchParams>>({
    pageNumber: 0,
    pageSize: initialPageSize,
    ...initialFilters,
    sort: sortConfig,
  });

  /**
   * Obtiene los datos de hospitales aplicando los filtros actuales
   */
  const fetchHospitals = useCallback(
    async (
      currentFilters: Partial<HospitalSearchParams>,
      searchTerm?: string
    ) => {
      setLoading(true);
      setError(null);

      try {
        const params = {
          ...currentFilters,
          sort: getSortQuery(), // Usar el nuevo helper para obtener el query de ordenamiento
        };

        // Aplicar término de búsqueda solo a los parámetros seleccionados
        if (searchTerm) {
          searchFields.forEach((field) => {
            if (isValidSearchField(field)) {
              // Verificar que el campo sea válido
              if (field === "id") {
                const numericId = parseInt(searchTerm);
                if (!isNaN(numericId)) {
                  params.id = numericId;
                }
              } else {
                // Si el campo es "name" o "ruc" se agrega a los parámetros
                params[field] = searchTerm;
              }
            }
          });
        }

        const response = await getHospitals(params);
        setData(response.content);
        setPagination({
          totalPages: response.totalPages,
          totalElements: response.totalElements,
          pageSize: response.size,
          currentPage: response.number,
        });
      } catch (err) {
        setError("Error al cargar los hospitales");
        setData([]);
        console.error("Error en fetchHospitals:", err);
      } finally {
        setLoading(false);
      }
    },
    [getSortQuery, searchFields]
  );

  // Manejador para los parámetros de búsqueda
  const handleSearchParamsChange = useCallback((params: string[]) => {
    setSearchFields(params.filter(isValidSearchField));
  }, []);

  // Efecto para actualizar datos cuando cambian los filtros
  useEffect(() => {
    fetchHospitals(filters, debouncedSearchTerm);
  }, [debouncedSearchTerm, filters, fetchHospitals]);

  // Manejadores de eventos

  // Manejador de búsqueda
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  // Manejador de cambio de estado de hospital
  const handleStateChange = useCallback((stateId: number | null) => {
    setState(stateId);
    if (stateId === null) {
      setFilters((prev) => ({ ...prev, stateId: undefined }));
      return;
    }
    setFilters((prev) => ({ ...prev, stateId }));
  }, []);

  // Manejador de cambio de página
  const setPage = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, pageNumber: page }));
  }, []);

  // Refrescar datos
  const refresh = useCallback(() => {
    fetchHospitals(filters, debouncedSearchTerm);
  }, [fetchHospitals, filters, debouncedSearchTerm]);

  // Manejador de cambio de tamaño de página
  const setPageSize = useCallback((newPageSize: number) => {
    setFilters((prev) => ({
      ...prev,
      pageSize: newPageSize,
      pageNumber: 0,
    }));
  }, []);

  return {
    // Datos y estado
    data,
    isLoading,
    error,
    searchTerm,
    pagination,
    filters,
    sortConfig,
    selectedState,
    searchFields,

    // Acciones
    handleSearch,
    handleSort,
    setPage,
    setPageSize,
    setFilters,
    handleStateChange,
    refresh,
    handleSearchParamsChange,
    setSearchFields,
  };
}
