import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { deleteUser } from '../service/userService';

interface ModalState {
  isOpen: boolean;
  userId: string | null;
}

export function useUserDelete() {
  const queryClient = useQueryClient();

  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    userId: null,
  });

  const mutation = useMutation({
    mutationFn: (userId: string) => deleteUser(userId),
    onSuccess: async () => {
      // Wait for the invalidation to complete before closing the modal
      await queryClient.invalidateQueries({ queryKey: ['users'] });
      setModalState({ isOpen: false, userId: null });
    },
  });

  const handleDelete = async () => {
    if (!modalState.userId) return;

    try {
      // Use mutateAsync instead of mutate to wait for the response
      await mutation.mutateAsync(modalState.userId);
    } catch {
      throw new Error('Error al eliminar el usuario');
    }
  };

  const openDeleteModal = (userId: string) => {
    setModalState({ isOpen: true, userId });
  };

  const closeDeleteModal = () => {
    setModalState({ isOpen: false, userId: null });
    mutation.reset();
  };

  return {
    deleteState: {
      isLoading: mutation.isPending,
      error: mutation.error ? 'Error al eliminar el usuario' : null,
    },
    isOpen: modalState.isOpen,
    handleDelete,
    openDeleteModal,
    closeDeleteModal,
  };
}
