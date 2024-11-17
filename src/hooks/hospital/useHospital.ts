import { useState, useEffect, useCallback } from "react";
import {
  createHospital,
  deleteHospital,
  getHospitals,
} from "@/services/hospitalService";
import { HospitalListDTO } from "@/types/DTO/hospital/HospitalListDTO";
import { HospitalCreateRequest } from "@/types/DTO/hospital/HospitalCreateRequest";
import { useDebounce } from "../useDebounce";
import { PaginationState } from "@/types/Pagination";

// Types
interface HospitalState {
  hospitals: HospitalListDTO[];
  loading: boolean;
  error: string | null;
}

interface DeleteState {
  isDeleting: boolean;
  error: string | null;
}

export const useHospitals = () => {
  // State management
  const [deleteState, setDeleteState] = useState<DeleteState>({
    isDeleting: false,
    error: null,
  });

  const [hospitalState, setHospitalState] = useState<HospitalState>({
    hospitals: [],
    loading: true,
    error: null,
  });

  const [paginationState, setPaginationState] = useState<PaginationState>({
    page: 0,
    pageSize: 20,
    totalPages: 0,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [createState, setCreateState] = useState({
    isCreating: false,
    error: null as string | null,
  });

  const debouncedSearch = useDebounce(searchQuery, 300);

  // Fetch hospitals
  const fetchHospitals = useCallback(
    async (pageNumber: number) => {
      try {
        setHospitalState((prev) => ({ ...prev, loading: true, error: null }));

        const data = await getHospitals({
          pageNumber,
          pageSize: paginationState.pageSize,
          name: debouncedSearch || undefined,
          ruc: debouncedSearch || undefined,
        });

        setHospitalState({
          hospitals: data.content,
          loading: false,
          error: null,
        });
        setPaginationState((prev) => ({
          ...prev,
          totalPages: data.totalPages,
        }));
      } catch (err) {
        setHospitalState((prev) => ({
          ...prev,
          loading: false,
          error: "Error al cargar hospitales",
        }));
        console.error(err);
      }
    },
    [debouncedSearch, paginationState.pageSize]
  );

  // Handle pagination and search
  useEffect(() => {
    if (debouncedSearch && paginationState.page !== 0) {
      setPaginationState((prev) => ({ ...prev, page: 0 }));
      return;
    }
    fetchHospitals(paginationState.page);
  }, [debouncedSearch, paginationState.page, fetchHospitals]);

  // Create hospital
  const handleCreateHospital = async (hospitalData: HospitalCreateRequest) => {
    try {
      setCreateState({ isCreating: true, error: null });
      const newHospital = await createHospital(hospitalData);
      await fetchHospitals(0);
      setPaginationState((prev) => ({ ...prev, page: 0 }));
      return newHospital;
    } catch (error) {
      setCreateState((prev) => ({
        ...prev,
        error: "Error al crear el hospital",
      }));
      throw error;
    } finally {
      setCreateState((prev) => ({ ...prev, isCreating: false }));
    }
  };

  // Eliminar hospital
  const handleDeleteHospital = async (hospitalId: number) => {
    try {
      setDeleteState({ isDeleting: true, error: null });
      await deleteHospital(hospitalId);
      await fetchHospitals(0);
      setPaginationState((prev) => ({ ...prev, page: 0 }));
      return true;
    } catch (error) {
      setDeleteState((prev) => ({
        ...prev,
        error: "Error al eliminar el hospital",
      }));
      console.error("Error al eliminar hospital:", error);
      return false;
    } finally {
      setDeleteState((prev) => ({ ...prev, isDeleting: false }));
    }
  };

  return {
    // Hospital data and state
    hospitals: hospitalState.hospitals,
    loading: hospitalState.loading,
    error: hospitalState.error,

    // Pagination
    currentPage: paginationState.page,
    totalPages: paginationState.totalPages,
    setPage: (page: number) =>
      setPaginationState((prev) => ({ ...prev, page })),
    setPageSize: (pageSize: number) =>
      setPaginationState((prev) => ({ ...prev, pageSize })),

    // Search
    setSearchQuery,

    // Create functionality
    createHospital: handleCreateHospital,
    isCreating: createState.isCreating,
    createError: createState.error,

    // Delete functionality
    deleteHospital: handleDeleteHospital,
    isDeleting: deleteState.isDeleting,
    deleteError: deleteState.error,
  } as const;
};
