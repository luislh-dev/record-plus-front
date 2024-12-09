import { useDebounce } from "@/hooks/useDebounce";
import { PaginationState } from "@/types/Pagination";
import { useState, useCallback } from "react";
import { getHospitals } from "../service/hospitalService";
import { useSort } from "@/hooks/useSort";
import {
  HOSPITAL_SORTABLE_FIELDS,
  HospitalSortField,
} from "../constants/sortableFields";
import { HospitalRequestParams } from "../types/HospitalRequestParams";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface UseHospitalParams {
  initialPageSize?: number;
  searchDelay?: number;
  initialFilters?: HospitalRequestParams;
}

// Campos válidos para búsqueda
type SearchableFields = keyof Pick<
  HospitalRequestParams,
  "name" | "ruc" | "id"
>;

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
  const queryClient = useQueryClient();

  // Estados y configuración de ordenamiento
  const { sortConfig, handleSort, getSortQuery } = useSort<HospitalSortField>({
    defaultField: "updatedAt",
    defaultDirection: "desc",
    sortableFields: Object.keys(
      HOSPITAL_SORTABLE_FIELDS
    ) as HospitalSortField[],
  });

  // Estados locales
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setState] = useState<number | null>(null);
  const [searchFields, setSearchFields] = useState<string[]>(["name"]);
  const [filters, setFilters] = useState<HospitalRequestParams>({
    page: 0,
    size: initialPageSize,
    ...initialFilters,
  });

  // Aplicar debounce al término de búsqueda
  const debouncedSearchTerm = useDebounce(searchTerm, searchDelay);

  // Construir parámetros de búsqueda
  const buildSearchParams = useCallback(
    (baseFilters: HospitalRequestParams, searchTerm?: string) => {
      const params = {
        ...baseFilters,
        sort: `${getSortQuery().field},${getSortQuery().direction}`,
      };

      if (searchTerm) {
        searchFields.forEach((field) => {
          if (isValidSearchField(field)) {
            if (field === "id") {
              const numericId = parseInt(searchTerm);
              if (!isNaN(numericId)) {
                params.id = numericId;
              }
            } else {
              params[field] = searchTerm;
            }
          }
        });
      }

      return params;
    },
    [getSortQuery, searchFields]
  );

  // Query principal
  const {
    data: queryData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["hospitals", filters, debouncedSearchTerm, sortConfig],
    queryFn: async () => {
      const params = buildSearchParams(filters, debouncedSearchTerm);
      return getHospitals(params);
    },
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  // Extraer datos y estado de paginación
  const data = queryData?.content ?? [];
  const pagination: PaginationState = {
    totalPages: queryData?.totalPages ?? 0,
    totalElements: queryData?.totalElements ?? 0,
    pageSize: queryData?.size ?? initialPageSize,
    currentPage: queryData?.number ?? 0,
  };

  // Manejadores de eventos
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    setFilters((prev) => ({ ...prev, page: 0 }));
  }, []);

  const handleSearchParamsChange = useCallback((params: string[]) => {
    setSearchFields(params.filter(isValidSearchField));
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
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  const setPageSize = useCallback((newPageSize: number) => {
    setFilters((prev) => ({
      ...prev,
      size: newPageSize,
      page: 0,
    }));
  }, []);

  // Prefetch siguiente página
  const prefetchNextPage = useCallback(() => {
    if (queryData && queryData.number < queryData.totalPages - 1) {
      const nextPageFilters = {
        ...filters,
        page: (filters.page ?? 0) + 1,
      };
      const params = buildSearchParams(nextPageFilters, debouncedSearchTerm);

      queryClient.prefetchQuery({
        queryKey: [
          "hospitals",
          nextPageFilters,
          debouncedSearchTerm,
          sortConfig,
        ],
        queryFn: () => getHospitals(params),
      });
    }
  }, [
    queryClient,
    filters,
    debouncedSearchTerm,
    sortConfig,
    buildSearchParams,
    queryData,
  ]);

  return {
    // Datos y estado
    data,
    isLoading,
    error: error ? "Error al cargar los hospitales" : null,
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
    refresh: refetch,
    handleSearchParamsChange,
    setSearchFields,
    prefetchNextPage,
  };
}
