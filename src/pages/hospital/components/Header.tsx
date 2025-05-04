import { Add } from '@/icons/Add';
import { Button } from '@heroui/react';
import { useNavigate } from 'react-router-dom';

export function Header() {
  const navigate = useNavigate();
  return (
    <div className='flex max-w-full justify-between'>
      <h1 className='text-2xl font-bold'>Lista de Hospitales</h1>
      <Button
        color='primary'
        onPress={() => navigate('/hospitals/add')}
        endContent={<Add size={18} />}
      >
        Agregar Hospital
      </Button>
    </div>
  );
}
