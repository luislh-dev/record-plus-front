import { Add } from '@/icons/Add';
import { Button } from '@heroui/react';
import { useNavigate } from 'react-router-dom';

export const HeaderList = () => {
  const navigate = useNavigate();
  return (
    <div className="flex max-w-full justify-between px-3">
      <h1 className="text-2xl font-bold">Lista de Pacientes</h1>
      <Button
        color="primary"
        onPress={() => navigate('/people/add')}
        endContent={<Add size={18} />}
      >
        Registrar paciente
      </Button>
    </div>
  );
};
