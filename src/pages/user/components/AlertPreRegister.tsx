import { Alert } from '@heroui/react';

export const AlertPreRegister = () => {
  return (
    <Alert
      color='warning'
      variant='bordered'
      title='Consejo'
      description='Para registrar un nuevo usuario, primero ingrese el documento de identidad para cargar los datos personales. Luego complete la información de acceso al sistema'
    />
  );
};
