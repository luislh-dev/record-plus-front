import { addToast } from '@heroui/react';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PeopleCreateForm } from './components/PeopleCreateForm';
import { PersonSearch } from './components/PersonSearch';
import { useCreateRequeridPerson } from './hooks/useCreatePerson';
import type { PeopleCreateRequiredValues } from './models/peopleCreateRequiredSchema';
import type { MinimalPeopleResponseDto } from './types/MinimalPeopleResponseDto';

export const PeopleAdd = () => {
  const [personData, setPersonData] = useState<MinimalPeopleResponseDto | null>(null);
  const { isCreating, error, isSuccess, handleCreate } = useCreateRequeridPerson();
  const navigate = useNavigate();

  const handleCreatePerson = async (data: PeopleCreateRequiredValues) => {
    try {
      return await handleCreate(data);
    } finally {
      if (isSuccess) {
        addToast({
          title: 'Persona creada',
          description: 'La persona ha sido creada exitosamente.',
          severity: 'success',
          color: 'success',
          timeout: 5000,
        });
        navigate('/people');
      } else if (error) {
        addToast({
          title: 'Error al crear persona',
          description: error,
          severity: 'danger',
          color: 'danger',
          timeout: 10000,
        });
      }
    }
  };

  const handlePersonFound = useCallback((person: MinimalPeopleResponseDto | null) => {
    setPersonData(person);
    if (person && !person.hasExternalSource) {
      addToast({
        title: 'Persona existente',
        description: 'Esta persona ya está registrada en el sistema.',
        severity: 'warning',
        color: 'warning',
        timeout: 15000,
      });
    }
  }, []);

  return (
    <div className='flex flex-col gap-4 w-full md:w-[600px]'>
      <PersonSearch onPersonFound={handlePersonFound} />
      <div>
        <PeopleCreateForm
          key={personData?.documentNumber}
          onSubmit={handleCreatePerson}
          personData={personData}
          showReniecData
          isLoading={isCreating}
        />
      </div>
    </div>
  );
};
