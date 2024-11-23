import { deleteHospital, getHospitals } from "../service/hospitalService";
import { HospitalListDTO } from "@/pages/hospital/types/HospitalListDTO";
import { useGenericSearch } from "@/hooks/generic/useGenericSearch";
import { useCallback, useState } from "react";
import { HospitalSearchParams } from "../types/hospital";

interface UseParams {
  initialPageSize?: number;
  searchDelay?: number;
}

export function useHospital(params: UseParams = {}) {
  const [deleteState, setDeleteState] = useState({
    isDeleting: false,
    error: null as string | null,
  });

  const [modalState, setModalState] = useState({
    isOpen: false,
    hospitalId: null as number | null,
  });

  // Buscar y listar
  const result = useGenericSearch<HospitalListDTO, HospitalSearchParams>({
    ...params,
    fetchData: getHospitals,
  });

  // Eliminar
  const handleDelete = useCallback(async () => {
    if (!modalState.hospitalId) return;

    setDeleteState({ isDeleting: true, error: null });

    try {
      await deleteHospital(modalState.hospitalId);
      result.refresh();
      setModalState({ isOpen: false, hospitalId: null });
    } catch (error) {
      console.error("Error deleting hospital:", error);
      setDeleteState({
        isDeleting: false,
        error: "Error al eliminar el hospital",
      });
    } finally {
      setDeleteState((prev) => ({ ...prev, isDeleting: false }));
    }
  }, [modalState.hospitalId, result]);

  const openDeleteModal = useCallback((hospitalId: number) => {
    setModalState({ isOpen: true, hospitalId });
  }, []);

  const closeDeleteModal = useCallback(() => {
    setModalState({ isOpen: false, hospitalId: null });
  }, []);

  return {
    // listar y buscar
    ...result,

    // eliminar
    deleteState,
    isOpen: modalState.isOpen,
    openDeleteModal,
    closeDeleteModal,
    handleDelete,
  };
}
