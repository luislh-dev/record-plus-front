import { ModalConfirmDelete } from '@/components/ModalConfirmDelete';
import { HospitalTable } from './components/HospitalTable';
import { useHospitalDelete } from './hooks/UseHospitalDelete';

const Hospital = () => {
  const {
    isOpen,
    closeDeleteModal,
    handleDelete,
    openDeleteModal,
    deleteState: { isLoading: isDeleting },
  } = useHospitalDelete();

  return (
    <>
      <HospitalTable onDelete={openDeleteModal} />

      <ModalConfirmDelete
        isOpen={isOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title='Eliminar Hospital'
        message='¿Está seguro que desea eliminar este hospital?'
      />
    </>
  );
};

export default Hospital;
