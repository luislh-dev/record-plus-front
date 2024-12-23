import { Typography } from '@/components/Typography';
import { useStates } from '@/hooks/state/useState';
import { PeopleCreateModal } from '@/pages/people/components/PeopleCreateModal';
import { MinimalPeopleResponseDto } from '@/pages/people/types/MinimalPeopleResponseDto';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardBody, CardHeader, useDisclosure } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUserDoctorCreate } from '../hooks/useUserCreate';
import { UserDoctorCreateValues, userDoctorCreateSchema } from '../models/userDoctorCreateSchema';

export const DoctorForm = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [personData, setPersonData] = useState<MinimalPeopleResponseDto | null>(null);
  const defaultValues = {
    personDNI: '',
    personalInfo: {
      name: '',
      surnames: '',
      phone: ''
    },
    email: '',
    name: '',
    password: '',
    passwordConfirmation: 's'
  } as Partial<UserDoctorCreateValues>;

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<UserDoctorCreateValues>({
    resolver: zodResolver(userDoctorCreateSchema),
    mode: 'onSubmit',
    defaultValues
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

  return (
    <>
      <PeopleCreateModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={() => {}}
        personData={personData || ({} as MinimalPeopleResponseDto)}
      />
      <section>
        <Card className="flex flex-col">
          <CardHeader>
            <header>
              <Typography as="h3" variant="section-title">
                Registro de usuario
              </Typography>
            </header>
          </CardHeader>
          <CardBody></CardBody>
        </Card>
      </section>
    </>
  );
};
