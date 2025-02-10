import { Add } from '@/icons/Add';
import { Button } from '@heroui/react';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();
  return (
    <div className='flex max-w-full justify-between px-3'>
      <h1 className='text-2xl font-bold'>Lista de Usuarios</h1>
      <Button color='primary' onPress={() => navigate('/user/add')} endContent={<Add size={18} />}>
        Agregar Usuario
      </Button>
    </div>
  );
};
