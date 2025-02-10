import { Button } from '@heroui/react';
import { useNavigate } from 'react-router-dom';
import { HospitalForm } from './components/HospitalForm';
import { useHospitalCreate } from './hooks/useHospitalCreate';

const HospitalAdd = () => {
  const navigate = useNavigate();

  const {
    handleCreate,
    createState: { isLoading, error }
  } = useHospitalCreate();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Agregar Hospital</h1>
        <Button color="danger" variant="light" onClick={() => navigate(-1)}>
          Cancelar
        </Button>
      </div>

      <HospitalForm onSubmit={handleCreate} isSubmitting={isLoading} apiErrors={error} />
    </div>
  );
};

export default HospitalAdd;
