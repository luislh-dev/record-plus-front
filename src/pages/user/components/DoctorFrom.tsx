import { CustomInput } from '@/components/CustomInput';
import { CustomSelect } from '@/components/CustomSelect';
import { Typography } from '@/components/Typography';
import { useStates } from '@/hooks/state/useState';
import { PeopleCreateModal } from '@/pages/people/components/PeopleCreateModal';
import { PersonSearch } from '@/pages/people/components/PersonSearch';
import type { MinimalPeopleResponseDto } from '@/pages/people/types/MinimalPeopleResponseDto';
import type { PeopleCreateRequiredDto } from '@/pages/people/types/PeopleCreateRequiredDto';
import { Button, Card, CardBody, CardHeader, Divider, Input, useDisclosure } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUserDoctorCreate } from '../hooks/useUserCreate';
import {
  type UserDoctorCreateValues,
  userDoctorCreateSchema,
} from '../models/userDoctorCreateSchema';
import { AlertPreRegister } from './AlertPreRegister';

export const DoctorForm = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [personData, setPersonData] = useState<MinimalPeopleResponseDto | null>(null);
  const defaultValues = {
    personDNI: '',
    personalInfo: {
      name: '',
      surnames: '',
      phone: '',
    },
    email: '',
    name: '',
    password: '',
    passwordConfirmation: '',
  } as Partial<UserDoctorCreateValues>;

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<UserDoctorCreateValues>({
    resolver: zodResolver(userDoctorCreateSchema),
    mode: 'onSubmit',
    defaultValues,
  });

  // Recuperar el estado de la lista de estados
  const { state } = useStates();

  useEffect(() => {
    if (state.length > 0) {
      setValue('stateId', state[0].id);
    }
  }, [state, setValue]);

  const { isLoading: isSubmitting, handleCreate } = useUserDoctorCreate();

  const onSubmit = (data: UserDoctorCreateValues) => {
    handleCreate(data);
  };

  const foundPerson = (person: MinimalPeopleResponseDto | null) => {
    // Si no se encuentra a la persona, se limpian los campos
    if (person === null && watch('personDNI')) {
      // Solo hace reset si había datos previos
      reset({
        personDNI: '',
        personalInfo: {
          name: '',
          surnames: '',
          phone: '',
        },
      });
      return;
    }

    if (person === null) return;

    if (person.hasExternalSource) {
      setPersonData(person);
      onOpen();
    } else {
      setValue('personDNI', person.documentNumber);
      setValue('personalInfo.name', person.name);
      setValue('personalInfo.surnames', `${person.fatherLastName} ${person.motherLastName}`);
      setValue('personalInfo.phone', person.phone);
    }
  };

  const handleConfirmPerson = (data: PeopleCreateRequiredDto) => {
    setValue('personDNI', data.documentNumber);
    setValue('personalInfo.name', data.name);
    setValue('personalInfo.surnames', `${data.paternalSurname} ${data.maternalSurname}`);
    setValue('personalInfo.phone', data.phone);
    onClose();
  };

  return (
    <>
      <PeopleCreateModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleConfirmPerson}
        personData={personData || ({} as MinimalPeopleResponseDto)}
      />
      <section>
        <Card className='flex flex-col'>
          <CardHeader>
            <header>
              <Typography as='h3' variant='section-title'>
                Registro de usuario
              </Typography>
            </header>
          </CardHeader>
          <CardBody>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
              {/* Buscador de persona */}
              <div className='flex flex-col'>
                <div className='flex gap-4 mb-4'>
                  <div className='flex flex-col gap-2 w-full'>
                    <PersonSearch onPersonFound={foundPerson} />
                    {errors.personDNI && (
                      <Typography as='p' variant='error' className='h-4 pl-1'>
                        {errors.personDNI.message}
                      </Typography>
                    )}
                  </div>
                </div>
                <AlertPreRegister />
                {/* Información de la persona encontrada */}
                <div className='flex flex-col mt-3'>
                  <Typography as='h5' variant='body-small' className='font-medium'>
                    Datos Encontrados
                  </Typography>
                  <div className='grid grid-cols-3 gap-4'>
                    <Input
                      type='text'
                      label='Nombre'
                      value={watch('personalInfo.name') || ''}
                      isDisabled
                    />

                    <Input
                      type='text'
                      label='Apellidos'
                      value={watch('personalInfo.surnames') || ''}
                      isDisabled
                    />
                    <Input
                      type='phone'
                      label='Teléfono'
                      value={watch('personalInfo.phone') || ''}
                      isDisabled
                    />
                  </div>
                </div>
              </div>
              <Divider />
              {/* Sección para al creación del usuario */}
              <div className='flex flex-col gap-3'>
                <Typography as='h5' variant='body-small' className='font-medium'>
                  Datos de acceso
                </Typography>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='col-span-2'>
                    <CustomInput
                      name='email'
                      control={control}
                      label='Email'
                      error={errors.email}
                      placeholder='Ingrese el email'
                      isRequired
                    />
                  </div>

                  <CustomInput
                    name='name'
                    control={control}
                    label='Usuario'
                    placeholder='Ingrese el nombre del usuario'
                    isRequired
                    error={errors.name}
                  />
                  <CustomSelect
                    name='stateId'
                    control={control}
                    label='Estado'
                    options={state}
                    error={errors.stateId}
                    isRequired
                  />
                  <CustomInput
                    name='password'
                    type='password'
                    control={control}
                    label='Contraseña'
                    placeholder='Ingrese la contraseña'
                    isRequired
                    error={errors.password}
                  />
                  <CustomInput
                    name='passwordConfirmation'
                    type='password'
                    control={control}
                    label='Confirmar contraseña'
                    placeholder='Confirme la contraseña'
                    isRequired
                    error={errors.passwordConfirmation}
                  />
                </div>
              </div>
              <div className='col-span-2 flex justify-end gap-2'>
                <Button type='submit' color='primary' isLoading={isSubmitting}>
                  Guardar
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </section>
    </>
  );
};
