import { Add } from '@/icons/Add';
import { Button, Chip } from '@heroui/react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  totalHospitals?: number;
}

export function Header(props: Readonly<HeaderProps>) {
  const { totalHospitals } = props;

  const navigate = useNavigate();
  return (
    <div className='flex max-w-full justify-between h-full items-center'>
      <div className='flex gap-1 items-center'>
        <h1 className='text-2xl font-bold'>Lista de Hospitales</h1>

        {totalHospitals !== undefined && <Chip className='font-bold text-inherit'>{totalHospitals}</Chip>}
      </div>
      <Button color='primary' onPress={() => navigate('/hospitals/add')} endContent={<Add size={18} />}>
        Agregar Hospital
      </Button>
    </div>
  );
}
