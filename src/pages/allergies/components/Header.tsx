import { Add } from '@/icons/Add';
import { Button, Chip } from '@heroui/react';

interface props {
  totalAllergies?: number;
}

export function Header({ totalAllergies }: props) {
  return (
    <div className='flex max-w-full justify-between h-full items-center'>
      <div className='flex gap-1 items-center'>
        <h1 className='text-2xl font-bold'>Lista de Alergias</h1>
        {totalAllergies !== undefined && <Chip className='font-bold text-inherit'>{totalAllergies}</Chip>}
      </div>
      <Button color='primary' endContent={<Add size={18} />}>
        Agregar Alergia
      </Button>
    </div>
  );
}
