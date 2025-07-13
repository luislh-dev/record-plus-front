import { CustomInput } from '@/components/CustomInput';
import { TextAreaForm } from '@/components/TextAreaForm';
import { AllergyCategoryController } from '@/components/controllers/AllergyCategoryController';
import type { ApiError } from '@/types/errros/ApiError';
import {
  Button,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  type UseDisclosureProps,
  addToast,
} from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAllergyCreate } from '../hooks/useAllergyCreate';
import { type AllergyCreateValues, allergyCreateSchema } from '../models/allergyCreateSchema';

interface AllergyCreateModalProps extends UseDisclosureProps {
  onSave?: (data: AllergyCreateValues) => void | Promise<void>;
}

export function AllergyCreateModal({ onSave, ...props }: Readonly<AllergyCreateModalProps>) {
  const { handleCreate, state } = useAllergyCreate();
  const [isEnabledRecreate, setIsEnabledRecreate] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AllergyCreateValues>({
    mode: 'onTouched',
    resolver: zodResolver(allergyCreateSchema),
    defaultValues: {
      name: '',
      description: '',
      category: '',
    },
  });

  const onSubmit = async (data: AllergyCreateValues) => {
    try {
      await handleCreate(data);

      addToast({
        title: 'Alergía creada',
        description: 'La alergía ha sido creada exitosamente.',
        severity: 'success',
        color: 'success',
        timeout: 5000,
      });
      reset();

      if (!isEnabledRecreate) {
        props.onChange?.(true);
      }
    } catch (error) {
      const typedError = error as ApiError;

      const errorDescription =
        typedError.details && typedError.details.length > 0
          ? typedError.details.map((detail) => detail.message).join('\n')
          : typedError.message || 'Ocurrió un error al crear la alergía.';

      addToast({
        title: 'Error al crear alergía',
        description: errorDescription,
        severity: 'danger',
        color: 'danger',
        timeout: 10000,
      });
    }
  };

  return (
    <Drawer isOpen={props.isOpen} onOpenChange={props.onChange}>
      <DrawerContent>
        {(onClose) => (
          <form className='flex flex-col h-full' onSubmit={handleSubmit(onSubmit)}>
            <DrawerHeader>Formulario para crear una Alergía</DrawerHeader>
            <DrawerBody>
              <div>
                <CustomInput
                  name='name'
                  control={control}
                  label='Nombre de la alergia'
                  placeholder='Ingrese el nombre de la alergia'
                  isRequired
                  error={errors.name}
                />
                <AllergyCategoryController
                  name='category'
                  control={control}
                  label='Categoría de alergia'
                  isRequired
                  error={errors.category}
                />
                <TextAreaForm
                  name='description'
                  control={control}
                  label='Descripción'
                  placeholder='Ingrese una descripción de la alergia'
                  error={errors.description}
                  isRequired={false}
                />
              </div>
              <Checkbox isSelected={isEnabledRecreate} onValueChange={setIsEnabledRecreate}>
                Crear otro al terminar
              </Checkbox>
            </DrawerBody>
            <DrawerFooter>
              <Button color='danger' variant='flat' onPress={onClose}>
                Cerrar
              </Button>
              <Button color='primary' type='submit' isLoading={state.isLoading}>
                Guardar
              </Button>
            </DrawerFooter>
          </form>
        )}
      </DrawerContent>
    </Drawer>
  );
}
