import { Add } from '@/icons/Add';
import { Button, Chip } from '@heroui/react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  total?: number;
}

export const Header = (props: HeaderProps) => {
  const { total } = props;

  const navigate = useNavigate();
  return (
    <div className='flex max-w-full justify-between px-3'>
      <div className='flex gap-1 items-center'>
        <h1 className='text-2xl font-bold'>Lista de Usuarios</h1>
        {total !== undefined && <Chip className='font-bold text-inherit'>{total}</Chip>}
      </div>
      <Button color='primary' onPress={() => navigate('/user/add')} endContent={<Add size={18} />}>
        Agregar Usuario
      </Button>
    </div>
  );
};
