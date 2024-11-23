import { useCallback, useState } from "react";
import { deleteHospital } from "../service/hospitalService";

interface DeleteState {
  isDeleting: boolean;
  error: string | null;
}

interface ModalState {
  isOpen: boolean;
  hospitalId: number | null;
}

export function useHospitalDelete(onSuccess?: () => void) {
  const [deleteState, setDeleteState] = useState<DeleteState>({
    isDeleting: false,
    error: null,
  });

  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    hospitalId: null,
  });

  const handleDelete = useCallback(async () => {
    if (!modalState.hospitalId) return;

    setDeleteState({ isDeleting: true, error: null });

    try {
      await deleteHospital(modalState.hospitalId);
      onSuccess?.();
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
  }, [modalState, onSuccess]);

  // Manejadores del modal de eliminación
  const openDeleteModal = useCallback((hospitalId: number) => {
    setModalState({ isOpen: true, hospitalId });
  }, []);

  const closeDeleteModal = useCallback(() => {
    setModalState({ isOpen: false, hospitalId: null });
  }, []);

  return {
    deleteState,
    isOpen: modalState.isOpen,
    handleDelete,
    openDeleteModal,
    closeDeleteModal,
  };
}
