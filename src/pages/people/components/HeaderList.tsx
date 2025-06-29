import { Add } from '@/icons/Add';
import { Button, Chip } from '@heroui/react';
import { useNavigate } from 'react-router-dom';

type HeaderListProps = {
  total?: number;
};

export const HeaderList = ({ total }: HeaderListProps) => {
  const navigate = useNavigate();
  return (
    <div className='flex max-w-full justify-between px-3'>
      <div className='flex gap-1 items-center'>
        <h1 className='text-2xl font-bold'>Lista de Pacientes</h1>
        {total !== undefined && <Chip className='font-bold text-inherit'>{total}</Chip>}
      </div>
      <Button
        color='primary'
        onPress={() => navigate('/people/add')}
        endContent={<Add size={18} />}
      >
        Registrar paciente
      </Button>
    </div>
  );
};
