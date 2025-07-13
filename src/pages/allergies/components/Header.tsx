import { Add } from '@/icons/Add';
import { Button, Chip, useDisclosure } from '@heroui/react';
import { AllergyCreateModal } from './AllergyCreateModal';

interface Props {
  totalAllergies?: number;
}

export function Header({ totalAllergies }: Readonly<Props>) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className='flex max-w-full justify-between h-full items-center'>
        <div className='flex gap-1 items-center'>
          <h1 className='text-2xl font-bold'>Lista de Alergias</h1>
          {totalAllergies !== undefined && <Chip className='font-bold text-inherit'>{totalAllergies}</Chip>}
        </div>
        <Button color='primary' endContent={<Add size={18} />} onPress={onOpen}>
          Agregar Alergia
        </Button>
      </div>

      <AllergyCreateModal isOpen={isOpen} onChange={onOpenChange} />
    </>
  );
}
