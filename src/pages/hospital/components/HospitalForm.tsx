import { CustomInput } from '@/components/CustomInput';
import { CustomSelect } from '@/components/CustomSelect';
import { useStates } from '@/hooks/state/useState';
import { useApiErrors } from '@/hooks/useApiErrors';
import type { ApiError } from '@/types/errros/ApiError';
import { Button } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { type HospitalCreateValues, hospitalCreateSchema } from '../models/hospitalCreateSchema';

interface Props {
  onSubmit: (data: HospitalCreateValues) => void;
  isSubmitting?: boolean;
  defaultValues?: HospitalCreateValues;
  apiErrors?: ApiError | null;
}

export const HospitalForm = ({ onSubmit, isSubmitting, defaultValues, apiErrors }: Props) => {
  const state = useStates().state;
  const { backendErrors } = useApiErrors(apiErrors);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<HospitalCreateValues>({
    resolver: zodResolver(hospitalCreateSchema),
    mode: 'onChange',
    defaultValues: defaultValues || {
      name: '',
      address: '',
      phone: '',
      email: '',
      ruc: '',
      stateId: 0
    }
  });

  // Solo establecemos el valor inicial si no hay un defaultValue
  useEffect(() => {
    if (state.length > 0 && !defaultValues?.stateId) {
      setValue('stateId', state[0].id);
    }
  }, [state, setValue, defaultValues]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
      <CustomInput
        name="name"
        control={control}
        label="Nombre del hospital"
        placeholder="Ingrese el nombre"
        error={
          errors.name ||
          (backendErrors.name ? { message: backendErrors.name, type: 'backend' } : undefined)
        }
        isRequired
      />
      <CustomInput
        name="address"
        control={control}
        label="Dirección"
        placeholder="Ingrese la dirección"
        error={
          errors.address ||
          (backendErrors.address ? { message: backendErrors.address, type: 'backend' } : undefined)
        }
        isRequired
      />
      <CustomInput
        name="phone"
        control={control}
        label="Teléfono"
        placeholder="Ingrese el teléfono"
        error={
          errors.phone ||
          (backendErrors.phone ? { message: backendErrors.phone, type: 'backend' } : undefined)
        }
        isRequired
      />
      <CustomInput
        name="email"
        control={control}
        label="Correo electrónico"
        placeholder="Ingrese el correo"
        error={
          errors.email ||
          (backendErrors.email ? { message: backendErrors.email, type: 'backend' } : undefined)
        }
        isRequired
      />
      <CustomInput
        name="ruc"
        control={control}
        label="RUC"
        placeholder="Ingrese el RUC"
        error={
          errors.ruc ||
          (backendErrors.ruc ? { message: backendErrors.ruc, type: 'backend' } : undefined)
        }
        isRequired
      />
      <CustomSelect
        name="stateId"
        control={control}
        label="Estado"
        options={state}
        error={
          errors.stateId ||
          (backendErrors.stateId ? { message: backendErrors.stateId, type: 'backend' } : undefined)
        }
      />
      <div className="col-span-2 flex justify-end gap-2">
        <Button type="submit" color="primary" isLoading={isSubmitting}>
          Guardar
        </Button>
      </div>
    </form>
  );
};
