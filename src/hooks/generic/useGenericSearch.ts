import { PageResponse, PageRequest } from "@/types/Pagination";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "../useDebounce";

interface SortConfig {
  field: string;
  direction: "asc" | "desc";
}

interface SearchHookParams<TEntity, TSearchParams> {
  initialPageSize?: number;
  searchDelay?: number;
  fetchData: (params: Partial<TSearchParams>) => Promise<PageResponse<TEntity>>;
  initialFilters?: Partial<TSearchParams>;
}

interface PaginationState {
  totalPages: number;
  totalElements: number;
  pageSize: number;
  currentPage: number;
}

/**
 * Hook genérico para manejar búsquedas paginadas con filtros y ordenamiento
 * @template TEntity - Tipo de la entidad que se está buscando
 * @template TSearchParams - Tipo de los parámetros de búsqueda
 */
export function useGenericSearch<TEntity, TSearchParams extends PageRequest>({
  initialPageSize = 20,
  searchDelay = 300,
  fetchData,
  initialFilters = {},
}: SearchHookParams<TEntity, TSearchParams>) {
  // Estados principales
  const [data, setData] = useState<TEntity[]>([]);
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
  const [filters, setFilters] = useState<Partial<TSearchParams>>({
    pageNumber: 0,
    pageSize: initialPageSize,
    ...initialFilters,
    sort: sortConfig,
  });

  /**
   * Obtiene los datos aplicando los filtros actuales
   */
  const fetchItems = useCallback(
    async (currentFilters: Partial<TSearchParams>, searchTerm?: string) => {
      setLoading(true);
      setError(null);

      try {
        // Combinar filtros actuales con el término de búsqueda
        const params = {
          ...currentFilters,
          name: searchTerm || undefined,
        } as Partial<TSearchParams>;

        const response = await fetchData(params);
        setData(response.content);
        setPagination({
          totalPages: response.totalPages,
          totalElements: response.totalElements,
          pageSize: response.size,
          currentPage: response.number,
        });
      } catch (err) {
        setError("Error al cargar los datos");
        setData([]);
        console.error("Error en fetchItems:", err);
      } finally {
        setLoading(false);
      }
    },
    [fetchData]
  );

  // Efecto para actualizar datos cuando cambian los filtros
  useEffect(() => {
    fetchItems(filters, debouncedSearchTerm);
  }, [debouncedSearchTerm, filters, fetchItems]);

  // Manejadores de eventos
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const handleStateChange = useCallback((stateId: number | null) => {
    setState(stateId);
    setFilters((prev) => ({ ...prev, stateId }));
  }, []);

  const handleSort = useCallback(
    (field: keyof TEntity) => {
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
    fetchItems(filters, debouncedSearchTerm);
  }, [fetchItems, filters, debouncedSearchTerm]);

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
