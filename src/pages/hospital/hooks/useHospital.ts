import { deleteHospital, getHospitals } from "../service/hospitalService";
import { HospitalListDTO } from "@/pages/hospital/types/HospitalListDTO";
import { useGenericSearch } from "@/hooks/generic/useGenericSearch";
import { useCallback, useState } from "react";
import { HospitalSearchParams } from "../types/hospital";

interface UseHospitalParams {
  initialPageSize?: number;
  searchDelay?: number;
}

interface DeleteState {
  isDeleting: boolean;
  error: string | null;
}

interface ModalState {
  isOpen: boolean;
  hospitalId: number | null;
}

/**
 * Hook específico para la gestión de hospitales
 * Extiende useGenericSearch con funcionalidad específica de hospitales
 */
export function useHospital({
  initialPageSize,
  searchDelay,
}: UseHospitalParams = {}) {
  // Estados para el modal de eliminación
  const [deleteState, setDeleteState] = useState<DeleteState>({
    isDeleting: false,
    error: null,
  });

  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    hospitalId: null,
  });

  // Inicializar búsqueda genérica
  const searchResults = useGenericSearch<HospitalListDTO, HospitalSearchParams>(
    {
      initialPageSize,
      searchDelay,
      fetchData: getHospitals,
    }
  );

  // Manejadores del modal de eliminación
  const handleDelete = useCallback(async () => {
    if (!modalState.hospitalId) return;

    setDeleteState({ isDeleting: true, error: null });

    try {
      await deleteHospital(modalState.hospitalId);
      searchResults.refresh();
      setModalState({ isOpen: false, hospitalId: null });
    } catch (error) {
      console.error("Error al eliminar hospital:", error);
      setDeleteState({
        isDeleting: false,
        error: "Error al eliminar el hospital",
      });
    } finally {
      setDeleteState((prev) => ({ ...prev, isDeleting: false }));
    }
  }, [modalState.hospitalId, searchResults]);

  const openDeleteModal = useCallback((hospitalId: number) => {
    setModalState({ isOpen: true, hospitalId });
  }, []);

  const closeDeleteModal = useCallback(() => {
    setModalState({ isOpen: false, hospitalId: null });
  }, []);

  return {
    // Propagamos todos los resultados de búsqueda
    ...searchResults,

    // Estado y acciones de eliminación
    deleteState,
    isOpen: modalState.isOpen,
    openDeleteModal,
    closeDeleteModal,
    handleDelete,
  };
}
