import {
  createHospital,
  deleteHospital,
  getHospital,
  getHospitals,
  updateHospital,
} from "@/services/hospitalService";
import { HospitalListDTO } from "@/types/DTO/hospital/HospitalListDTO";
import { HospitalSearchParams } from "@/types/hospital";
import { useGenericSearch } from "./generic/useGenericSearch";
import { useCallback, useState } from "react";
import { HospitalCreateRequest } from "@/types/DTO/hospital/HospitalCreateRequest";

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

  const [createState, setCreateState] = useState({
    isCreating: false,
    error: null as string | null,
  });

  const [getByIdState, setGetByIdState] = useState({
    isLoading: false,
    error: null as string | null,
    data: null as HospitalCreateRequest | null,
  });

  const [updateState, setUpdateState] = useState({
    isUpdating: false,
    error: null as string | null,
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

  // Crear
  const handleCreate = useCallback(
    async (data: HospitalCreateRequest) => {
      setCreateState({ isCreating: true, error: null });

      try {
        await createHospital(data);
        result.refresh(); // Refresh list after creation
      } catch (error) {
        console.error("Error creating hospital:", error);
        setCreateState({
          isCreating: false,
          error: "Error al crear el hospital",
        });
        throw error;
      } finally {
        setCreateState((prev) => ({ ...prev, isCreating: false }));
      }
    },
    [result]
  );

  // Obtener por id
  const getById = useCallback(async (id: number) => {
    setGetByIdState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const hospital = await getHospital(id);
      setGetByIdState((prev) => ({
        ...prev,
        data: hospital,
        isLoading: false,
      }));
      return hospital;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Error al obtener el hospital";
      setGetByIdState((prev) => ({
        ...prev,
        error: message,
        isLoading: false,
      }));
      throw error;
    }
  }, []);

  // Actualizar
  const handleUpdate = useCallback(
    async (id: number, data: HospitalCreateRequest) => {
      setUpdateState({ isUpdating: true, error: null });

      try {
        await updateHospital(id, data);
        result.refresh(); // Refresh list after update
      } catch (error) {
        console.error("Error updating hospital:", error);
        setUpdateState({
          isUpdating: false,
          error: "Error al actualizar el hospital",
        });
        throw error; // Re-throw to handle in component
      } finally {
        setUpdateState((prev) => ({ ...prev, isUpdating: false }));
      }
    },
    [result]
  );

  return {
    // listar y buscar
    ...result,

    // eliminar
    deleteState,
    isOpen: modalState.isOpen,
    openDeleteModal,
    closeDeleteModal,
    handleDelete,

    // crear
    createState,
    handleCreate,

    // actualizar
    updateState,
    handleUpdate,

    // obtener por id
    getByIdState,
    getById,
  };
}
