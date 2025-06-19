import { CustomInput } from '@/components/CustomInput';
import { CustomSelect } from '@/components/CustomSelect';
import { useStates } from '@/hooks/state/useState';
import { useApiErrors } from '@/hooks/useApiErrors';
import type { ApiError } from '@/types/errros/ApiError';
import { Button } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { type HospitalCreateValues, hospitalCreateSchema } from '../models/hospitalCreateSchema';

interface Props {
  onSubmit: (data: HospitalCreateValues) => void;
  isSubmitting?: boolean;
  defaultValues?: HospitalCreateValues;
  apiErrors?: ApiError | null;
}

export const HospitalForm = ({ onSubmit, isSubmitting, defaultValues, apiErrors }: Props) => {
  const state = useStates().state;
  const { backendErrors, resetErrors } = useApiErrors(apiErrors);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    watch,
  } = useForm<HospitalCreateValues>({
    resolver: zodResolver(hospitalCreateSchema),
    mode: 'onChange',
    defaultValues: defaultValues || {
      name: '',
      address: '',
      phone: '',
      email: '',
      ruc: '',
      stateId: 1,
    },
  });

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  watch((value) => {
    if (value.name || value.address || value.phone || value.email || value.ruc || value.stateId) {
      resetErrors();
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        name='name'
        control={control}
        label='Nombre del hospital'
        placeholder='Ingrese el nombre'
        error={
          errors.name ||
          (backendErrors.name ? { message: backendErrors.name, type: 'backend' } : undefined)
        }
        isRequired
      />
      <CustomInput
        name='address'
        control={control}
        label='Dirección'
        placeholder='Ingrese la dirección'
        error={
          errors.address ||
          (backendErrors.address ? { message: backendErrors.address, type: 'backend' } : undefined)
        }
        isRequired
      />
      <div className='grid grid-cols-2 gap-x-4'>
        <CustomInput
          name='email'
          control={control}
          label='Correo electrónico'
          placeholder='Ingrese el correo'
          error={
            errors.email ||
            (backendErrors.email ? { message: backendErrors.email, type: 'backend' } : undefined)
          }
          isRequired
        />
        <CustomInput
          name='phone'
          control={control}
          label='Teléfono'
          placeholder='Ingrese el teléfono'
          error={
            errors.phone ||
            (backendErrors.phone ? { message: backendErrors.phone, type: 'backend' } : undefined)
          }
          isRequired
        />
        <CustomInput
          name='ruc'
          control={control}
          label='RUC'
          placeholder='Ingrese el RUC'
          error={
            errors.ruc ||
            (backendErrors.ruc ? { message: backendErrors.ruc, type: 'backend' } : undefined)
          }
          isRequired
        />
        <CustomSelect
          name='stateId'
          control={control}
          label='Estado'
          options={state}
          error={
            errors.stateId ||
            (backendErrors.stateId
              ? { message: backendErrors.stateId, type: 'backend' }
              : undefined)
          }
        />
      </div>

      <div className='flex gap-2 mt-1'>
        <Button
          type='submit'
          color='primary'
          isLoading={isSubmitting}
          isDisabled={!isValid || !isDirty}
        >
          Guardar
        </Button>
        <Button onPress={handleGoBack}>Cancelar</Button>
      </div>
    </form>
  );
};
