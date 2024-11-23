import { useDebounce } from "@/hooks/useDebounce";
import { PaginationState, SortConfig } from "@/types/Pagination";
import { useState, useCallback, useEffect } from "react";
import { HospitalSearchParams } from "../types/hospital";
import { HospitalListDTO } from "../types/HospitalListDTO";
import { getHospitals } from "../service/hospitalService";

interface UseHospitalParams {
  initialPageSize?: number;
  searchDelay?: number;
  initialFilters?: Partial<HospitalSearchParams>;
}

export function useHospitalSearch({
  initialPageSize = 20,
  searchDelay = 300,
  initialFilters = {},
}: UseHospitalParams = {}) {
  // Estados principales
  const [data, setData] = useState<HospitalListDTO[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setState] = useState<number | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: "name",
    direction: "asc",
  });

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
        // Combinar filtros actuales con el término de búsqueda
        const params = {
          ...currentFilters,
          name: searchTerm || undefined,
        } as Partial<HospitalSearchParams>;

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
    []
  );

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

  const handleSort = useCallback(
    (field: keyof HospitalListDTO) => {
      const direction =
        sortConfig.field === field && sortConfig.direction === "asc"
          ? "desc"
          : "asc";
      const newSortConfig: SortConfig = { field: field as string, direction };

      setSortConfig(newSortConfig);
      setFilters((prev) => ({ ...prev, sort: newSortConfig }));
    },
    [sortConfig]
  );

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
  };
}
