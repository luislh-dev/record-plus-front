import { useDebounce } from "@/hooks/useDebounce";
import { PaginationState } from "@/types/Pagination";
import { useState, useCallback, useEffect } from "react";
import { HospitalSearchParams } from "../types/hospital";
import { HospitalListDTO } from "../types/HospitalListDTO";
import { getHospitals } from "../service/hospitalService";
import { useSort } from "@/hooks/useSort";

export const HOSPITAL_SORTABLE_FIELDS = {
  name: { field: "name", label: "Nombre" },
  phone: { field: "phone", label: "Teléfono" },
  email: { field: "email", label: "Correo electrónico" },
  ruc: { field: "ruc", label: "RUC" },
} as const;

// Esto extraerá las keys del objeto
export type HospitalSortField = keyof typeof HOSPITAL_SORTABLE_FIELDS;

interface UseHospitalParams {
  initialPageSize?: number;
  searchDelay?: number;
  initialFilters?: Partial<HospitalSearchParams>;
}

// Campos válidos para búsqueda
type SearchableFields = keyof Pick<HospitalSearchParams, "name" | "ruc" | "id">;

export function useHospitalSearch({
  initialPageSize = 20,
  searchDelay = 300,
  initialFilters = {},
}: UseHospitalParams = {}) {
  // Estados principales
  const { sortConfig, handleSort, getSortQuery } = useSort<HospitalSortField>({
    defaultField: "name",
    defaultDirection: "asc",
    sortableFields: Object.keys(
      HOSPITAL_SORTABLE_FIELDS
    ) as HospitalSortField[],
  });

  const [data, setData] = useState<HospitalListDTO[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setState] = useState<number | null>(null);
  const [selectedSearchParams, setSelectedSearchParams] = useState<
    SearchableFields[]
  >(["name"]);

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
          selectedSearchParams.forEach((param) => {
            if (param === "id") {
              const parsedId = parseInt(searchTerm);
              if (!isNaN(parsedId)) {
                params[param] = parsedId;
              }
            } else {
              // Ahora TypeScript sabe que param solo puede ser 'name' o 'ruc'
              params[param] = searchTerm;
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
    [getSortQuery, selectedSearchParams]
  );

  // Manejador para los parámetros de búsqueda
  const handleSearchParamsChange = useCallback((params: string[]) => {
    setSelectedSearchParams(
      params.filter((param): param is SearchableFields =>
        ["name", "ruc", "id"].includes(param)
      )
    );
  }, []);

  // Efecto para actualizar datos cuando cambian los filtros
  useEffect(() => {
    fetchHospitals(filters, debouncedSearchTerm);
  }, [debouncedSearchTerm, filters, fetchHospitals]);

  // Manejadores de eventos
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const handleStateChange = useCallback((stateId: number | null) => {
    setState(stateId);
    if (stateId === null) {
      setFilters((prev) => ({ ...prev, stateId: undefined }));
      return;
    }
    setFilters((prev) => ({ ...prev, stateId }));
  }, []);

  const setPage = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, pageNumber: page }));
  }, []);

  const refresh = useCallback(() => {
    fetchHospitals(filters, debouncedSearchTerm);
  }, [fetchHospitals, filters, debouncedSearchTerm]);

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

    // Acciones
    handleSearch,
    handleSort,
    setPage,
    setPageSize,
    setFilters,
    handleStateChange,
    refresh,
    handleSearchParamsChange,
  };
}
