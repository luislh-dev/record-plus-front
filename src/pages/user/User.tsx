import { ModalConfirmDelete } from '@/components/ModalConfirmDelete';
import { DropDownFilter } from './components/DropDownFilter';
import { Header } from './components/Header';
import { Search } from './components/Search';
import { UserList } from './components/UserList';
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
      <section>
        <Header />
        <nav className='flex gap-x-4 px-2 pb-2 pt-4'>
          <Search />
          <DropDownFilter />
        </nav>
        <UserList onDelete={openDeleteModal} />
      </section>

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
