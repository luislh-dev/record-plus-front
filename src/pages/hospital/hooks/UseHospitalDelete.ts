import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { deleteHospital } from '../service/hospitalService';

interface ModalState {
  isOpen: boolean;
  hospitalId: number | null;
}

export function useHospitalDelete() {
  const queryClient = useQueryClient();

  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    hospitalId: null,
  });

  const mutation = useMutation({
    mutationFn: (hospitalId: number) => deleteHospital(hospitalId),
    onSuccess: async () => {
      // Esperar a que se complete la invalidación antes de cerrar el modal
      await queryClient.invalidateQueries({ queryKey: ['hospitals'] });
      setModalState({ isOpen: false, hospitalId: null });
    },
  });

  const handleDelete = useCallback(async () => {
    if (!modalState.hospitalId) return;

    try {
      // Usar mutateAsync en lugar de mutate para esperar la respuesta
      await mutation.mutateAsync(modalState.hospitalId);
    } catch {
      throw new Error('Error al eliminar el hospital');
    }
  }, [modalState.hospitalId, mutation]);

  // Manejadores del modal de eliminación
  const openDeleteModal = useCallback((hospitalId: number) => {
    setModalState({ isOpen: true, hospitalId });
  }, []);

  const closeDeleteModal = useCallback(() => {
    setModalState({ isOpen: false, hospitalId: null });
    mutation.reset(); // resetear estado de la mutación
  }, [mutation]);

  return {
    deleteState: {
      isLoading: mutation.isPending,
      error: mutation.error ? 'Error al eliminar el hospital' : null,
    },
    isOpen: modalState.isOpen,
    handleDelete,
    openDeleteModal,
    closeDeleteModal,
  };
}
