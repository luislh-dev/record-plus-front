import { CustomInput } from '@/components/CustomInput';
import { CustomSelect } from '@/components/CustomSelect';
import { DatePickerForm } from '@/components/DatePickerForm';
import { Typography } from '@/components/Typography';
import { useGender } from '@/hooks/gender/useGender';
import { allowOnlyNumbers } from '@/utils/allowOnlyNumbers';
import { Alert, Button } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  type PeopleCreateRequiredValues,
  peopleCreateRequiredSchema,
} from '../models/peopleCreateRequiredSchema';
import type { MinimalPeopleResponseDto } from '../types/MinimalPeopleResponseDto';

interface FormProps {
  defaultValues?: Partial<PeopleCreateRequiredValues>;
  onSubmit: (data: PeopleCreateRequiredValues) => Promise<void> | void;
  isLoading?: boolean;
  showReniecData?: boolean;
  personData?: MinimalPeopleResponseDto;
}

export const PeopleCreateForm = ({
  onSubmit,
  isLoading,
  showReniecData = false,
  personData,
}: FormProps) => {
  const { gender } = useGender();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PeopleCreateRequiredValues>({
    resolver: zodResolver(peopleCreateRequiredSchema),
    mode: 'onSubmit',
    defaultValues: {
      birthdate: undefined,
      sexTypeId: 3,
      phone: personData?.phone || '',
      typeDocumentId: 1,
      documentNumber: personData?.documentNumber || '',
      name: personData?.name || '',
      paternalSurname: personData?.fatherLastName || '',
      maternalSurname: personData?.motherLastName || '',
    },
  });

  const dataSource = personData?.dataSource?.toUpperCase() || 'RENIEC';

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {showReniecData && personData && (
        <>
          <div className='mb-4'>
            <Typography as='h3' variant='subsection'>
              Confirmar datos de {dataSource}
            </Typography>
            <Typography variant='body' color='muted'>
              Se encontraron los siguientes datos en {dataSource}. Por favor confirme que son
              correctos.
            </Typography>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
            <div>
              <Typography variant='data-title' color='muted'>
                Nombres
              </Typography>
              <Typography variant='body-small' className='font-medium'>
                {personData.name}
              </Typography>
            </div>
            <div>
              <Typography variant='data-title' color='muted'>
                Apellidos
              </Typography>
              <Typography variant='body-small' className='font-medium'>
                {personData.fatherLastName} {personData.motherLastName}
              </Typography>
            </div>
            <div>
              <Typography variant='data-title' color='muted'>
                Tipo de documento
              </Typography>
              <Typography variant='body-small' className='font-medium'>
                {personData.documentType}
              </Typography>
            </div>
            <div>
              <Typography variant='data-title' color='muted'>
                Número de documento
              </Typography>
              <Typography variant='body-small' className='font-medium'>
                {personData.documentNumber}
              </Typography>
            </div>
          </div>

          <Alert
            variant='bordered'
            description='Utiliza los datos recuperados para completar el formulario y registrar a la persona en el sistema de manera precisa.'
            className='mb-4'
          />
        </>
      )}

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <DatePickerForm
          name='birthdate'
          control={control}
          label='Fecha de nacimiento'
          isRequired
          variant='bordered'
          error={errors.birthdate}
          granularity='day'
        />
        <CustomSelect
          variant='bordered'
          control={control}
          name='sexTypeId'
          label='Genero'
          options={gender}
          placeholder='Seleccione un genero'
        />
        <CustomInput
          name='phone'
          variant='bordered'
          control={control}
          type='tel'
          onInput={allowOnlyNumbers}
          label='Teléfono'
          error={errors.phone}
          placeholder='Ingrese el teléfono'
          isRequired
        />
      </div>

      <div className='mt-6 flex justify-end gap-2'>
        <Button type='submit' color='primary' isLoading={isLoading} isDisabled={!isValid}>
          Confirmar
        </Button>
      </div>
    </form>
  );
};
