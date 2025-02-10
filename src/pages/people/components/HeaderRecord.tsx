import { Typography } from '@/components/Typography';
import { Add } from '@/icons/Add';
import { Button } from '@heroui/react';
import { useNavigate } from 'react-router-dom';

export const HeaderRecord = () => {
  const navigate = useNavigate();
  return (
    <header className='flex justify-between items-center w-full'>
      <Typography as='h2' variant='section-title'>
        Historial Medico
      </Typography>
      <Button
        color='primary'
        variant='solid'
        endContent={<Add size={20} />}
        onPress={() => navigate('record/add')}
      >
        Nuevo Registro
      </Button>
    </header>
  );
};
