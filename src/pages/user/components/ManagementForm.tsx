import { CustomInput } from '@/components/CustomInput';
import { CustomSelect } from '@/components/CustomSelect';
import { Typography } from '@/components/Typography';
import { useStates } from '@/hooks/state/useState';
import { HospitalMinimalSearch } from '@/pages/hospital/components/HospitalMinimalSearch';
import { PeopleCreateModal } from '@/pages/people/components/PeopleCreateModal';
import { PersonSearch } from '@/pages/people/components/PersonSearch';
import type { MinimalPeopleResponseDto } from '@/pages/people/types/MinimalPeopleResponseDto';
import type { PeopleCreateRequiredDto } from '@/pages/people/types/PeopleCreateRequiredDto';
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  useDisclosure,
} from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useUserManagementCreate } from '../hooks/useUserCreate';
import {
  type UserManagementCreateValues,
  userManagementCreateSchema,
} from '../models/userManagementCreateSchema';
import { SearchHospitalTooltip } from './SearchHospitalTooltip';

export const ManagementForm = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [personData, setPersonData] = useState<MinimalPeopleResponseDto | null>(null);
  const defaultValues = {
    personDNI: '',
    hospitalId: 0,
    personalInfo: {
      name: '',
      surnames: '',
      phone: '',
    },
    email: '',
    name: '',
    password: '',
    passwordConfirmation: '',
  } as Partial<UserManagementCreateValues>;

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<UserManagementCreateValues>({
    resolver: zodResolver(userManagementCreateSchema),
    mode: 'onSubmit',
    defaultValues,
  });

  const { isLoading: isSubmitting, handleCreate } = useUserManagementCreate();

  const { state } = useStates();

  const onSubmit = (data: UserManagementCreateValues) => {
    handleCreate(data);
  };

  useEffect(() => {
    if (state.length > 0) {
      setValue('stateId', state[0].id);
    }
  }, [state, setValue]);

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
        <Card className='flex flex-col' shadow='md'>
          <CardHeader>
            <header>
              <Typography as='h3' variant='section-title'>
                Registro de usuario
              </Typography>
            </header>
          </CardHeader>
          <CardBody className='flex flex-col'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
              {/* Sección para buscar a la persona a traves de su documento de identidad */}
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
                <Alert
                  color='warning'
                  variant='bordered'
                  title='Consejo'
                  description='Para registrar un nuevo usuario, primero ingrese el documento de identidad para cargar los datos personales. Luego complete la información de acceso al sistema'
                />
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

              <Divider className='my-2' />

              {/* Sección para buscar el hospital, al cual se le asignara al nuevo usuario */}
              <div className='flex flex-col gap-4'>
                <div className='flex items-center gap-x-2'>
                  <Typography as='h5' variant='body-small' className='font-medium'>
                    Buscar Hospital
                  </Typography>
                  <SearchHospitalTooltip />
                </div>
                <div className='flex flex-col gap-2'>
                  <Controller
                    name='hospitalId'
                    control={control}
                    render={({ field: { onChange } }) => (
                      <>
                        <HospitalMinimalSearch onHospitalSelected={onChange} />
                        {errors.hospitalId && (
                          <Typography as='p' variant='error' className='h-4 pl-1'>
                            {errors.hospitalId.message}
                          </Typography>
                        )}
                      </>
                    )}
                  />
                </div>
              </div>

              <Divider className='my-2' />

              {/* Sección para la creación de usuario */}
              <div className='flex flex-col gap-4'>
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
