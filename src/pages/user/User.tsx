import { ModalConfirmDelete } from '@/components/ModalConfirmDelete';
import { UserTable } from './components/UserTable';
import { useUserDelete } from './hooks/useUsersDeletes';

const User = () => {
  const {
    handleDelete,
    openDeleteModal,
    closeDeleteModal,
    deleteState: { isLoading: isDeleting },
    isOpen,
  } = useUserDelete();

  return (
    <>
      <UserTable onDelete={openDeleteModal} />

      <ModalConfirmDelete
        isOpen={isOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title='Eliminar Usuario'
        message='¿Estás seguro de que deseas eliminar este usuario?'
      />
    </>
  );
};

export default User;
