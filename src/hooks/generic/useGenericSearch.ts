import { PageResponse, PageRequest } from "@/types/Pagination";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "../useDebounce";

interface UseGenericSearchParams<TEntity, TSearchParams> {
  initialPageSize?: number;
  searchDelay?: number;
  fetchData: (params: Partial<TSearchParams>) => Promise<PageResponse<TEntity>>;
  initialFilters?: Partial<TSearchParams>;
}

export function useGenericSearch<TEntity, TSearchParams extends PageRequest>({
  initialPageSize = 20,
  searchDelay = 300,
  fetchData,
  initialFilters = {},
}: UseGenericSearchParams<TEntity, TSearchParams>) {
  const [sortConfig, setSortConfig] = useState({
    field: "name",
    direction: "asc" as "asc" | "desc",
  });

  const [data, setData] = useState<TEntity[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados de búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, searchDelay);

  // Filtros y estado de paginación
  const [filters, setFilters] = useState<Partial<TSearchParams>>({
    pageNumber: 0,
    pageSize: initialPageSize,
    initialFilters: {
      sort: sortConfig,
    },
    ...initialFilters,
  });

  // Ordenar por campo y dirección
  const handleSort = useCallback(
    (field: keyof TEntity) => {
      const direction =
        sortConfig.field === field && sortConfig.direction === "asc"
          ? "desc"
          : "asc";
      setSortConfig({ field: field as string, direction });
      setFilters((prev) => ({
        ...prev,
        sort: { field: field as string, direction },
      }));
    },
    [sortConfig]
  );

  // Estado de paginación
  const [pagination, setPagination] = useState({
    totalPages: 0,
    totalElements: 0,
    pageSize: initialPageSize,
    currentPage: 0,
  });

  // Función de obtención de datos
  const fetchItems = useCallback(
    async (params: Partial<TSearchParams>) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchData(params);
        setData(response.content);
        setPagination({
          totalPages: response.totalPages,
          totalElements: response.totalElements,
          pageSize: response.size,
          currentPage: response.number,
        });
      } catch (err) {
        setError("Error loading data");
        setData([]);
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [fetchData]
  );

  // Efecto para manejar cambios
  useEffect(() => {
    const updatedFilters = {
      ...filters,
      name: debouncedSearchTerm || undefined,
    } as Partial<TSearchParams>;

    fetchItems(updatedFilters);
  }, [debouncedSearchTerm, filters, fetchItems]); // Este efecto ahora vigila correctamente los filtros.

  // Controladores de eventos
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const setPage = useCallback((page: number) => {
    setFilters((prev) => ({
      ...prev,
      pageNumber: page,
    }));
  }, []);

  const setPageSize = useCallback((newPageSize: number) => {
    setFilters((prev) => ({
      ...prev,
      pageSize: newPageSize,
      pageNumber: 0,
    }));
  }, []);

  const setSort = useCallback((field: string, direction: "asc" | "desc") => {
    setFilters((prev) => ({
      ...prev,
      sort: { field, direction },
    }));
  }, []);

  return {
    data,
    isLoading,
    error,
    searchTerm,
    pagination,
    filters,
    handleSearch,
    setPage,
    setPageSize,
    setSort,
    refresh: () => fetchItems(filters),
    setFilters,
    handleSort,
    setSortConfig,
    sortConfig,
  };
}
