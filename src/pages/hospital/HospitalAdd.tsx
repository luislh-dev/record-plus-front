import { HeaderForm } from '@/components/form/HeaderForm';
import { HospitalForm } from './components/HospitalForm';
import { useHospitalCreate } from './hooks/useHospitalCreate';

const HospitalAdd = () => {
  const {
    handleCreate,
    createState: { isLoading, error },
  } = useHospitalCreate();

  return (
    <div className='flex flex-col gap-4 w-full md:w-[600px]'>
      <HeaderForm
        title='Registrar Hospital'
        description='Completa el siguiente formulario para registrar un nuevo hospital en el sistema.'
      />

      <HospitalForm onSubmit={handleCreate} isSubmitting={isLoading} apiErrors={error} />
    </div>
  );
};

export default HospitalAdd;
