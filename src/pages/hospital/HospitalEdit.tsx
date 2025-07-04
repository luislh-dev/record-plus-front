import { ErrorPanel } from '@/components/errors/ErrorPanel';
import { HeaderForm } from '@/components/form/HeaderForm';
import { Spinner } from '@heroui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { HospitalForm } from './components/HospitalForm';
import { useHospitalGetBy } from './hooks/useHospitalGetBy';
import { useHospitalUpdate } from './hooks/useHospitalUpdate';
import type { HospitalCreateValues } from './models/hospitalCreateSchema';

const HospitalEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const hospitalId = Number.parseInt(id || '0');

  const {
    getByIdState: { isLoading: isLoadingHospital, data: hospital, error: getError },
  } = useHospitalGetBy(hospitalId);

  const {
    handleUpdate,
    updateState: { isLoading: isUpdating, error: updateError },
  } = useHospitalUpdate();

  const onSubmit = async (data: HospitalCreateValues) => {
    if (!id) return;
    await handleUpdate({ id: Number.parseInt(id), data });
    handleGoBack();
  };

  const handleGoBack = () => {
    navigate('/hospitals');
  };

  if (isLoadingHospital) {
    return (
      <Spinner className='flex items-center justify-center h-full w-full p-4' label='Cargando...' />
    );
  }

  if (getError) {
    return <ErrorPanel error={getError} redirectTo='/hospitals' />;
  }

  return (
    <div className='flex flex-col gap-4 w-full md:w-[600px]'>
      <HeaderForm
        title='Editar Hospital'
        description='Completa el siguiente formulario para editar el hospital en el sistema.'
      />

      <HospitalForm
        onSubmit={onSubmit}
        isSubmitting={isUpdating}
        defaultValues={{
          name: hospital?.name || '',
          address: hospital?.address || '',
          phone: hospital?.phone || '',
          email: hospital?.email || '',
          ruc: hospital?.ruc || '',
          stateId: hospital?.stateId || 0,
        }}
        apiErrors={updateError}
      />
    </div>
  );
};

export default HospitalEdit;
