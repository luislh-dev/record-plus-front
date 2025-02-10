import { Button } from '@heroui/react';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700">Página no encontrada</h2>
        <p className="text-gray-500">Lo sentimos, la página que buscas no existe.</p>
        <Button onPress={() => navigate('/')} className="mt-4">
          Volver al inicio
        </Button>
      </div>
    </div>
  );
};
