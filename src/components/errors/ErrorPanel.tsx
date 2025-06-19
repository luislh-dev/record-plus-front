import type { ApiError } from '@/types/errros/ApiError';
import { Button, Link } from '@heroui/react';
import { useNavigate } from 'react-router-dom';

interface Props {
  error: ApiError;
  redirectTo?: string;
}

export const ErrorPanel = ({ error, redirectTo = '/' }: Props) => {
  const navigate = useNavigate();

  return (
    <div className='flex items-center justify-center h-full w-full p-4'>
      <div className='text-center space-y-4'>
        <h1 className='text-6xl font-bold text-gray-900'>{error.status}</h1>
        <p className='text-gray-500'>{error.message}</p>
        <Button onPress={() => navigate(redirectTo)} className='mt-4' as={Link}>
          Volver al inicio
        </Button>
      </div>
    </div>
  );
};
