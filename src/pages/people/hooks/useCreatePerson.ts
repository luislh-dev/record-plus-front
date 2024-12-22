import { ApiServiceError } from '@/services/api/ApiErrorHandler';
import { useState } from 'react';
import { toPeopleRequiredDto } from '../adapter/peopleCreateAdapter';
import { PeopleCreateRequiredValues } from '../models/peopleCreateRequiredSchema';
import { createPerson } from '../services/peopleService';

export function useCreateRequeridPerson() {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async (data: PeopleCreateRequiredValues) => {
    setIsCreating(true);
    setError(null);

    try {
      await createPerson(toPeopleRequiredDto(data));
    } catch (error) {
      if (error instanceof ApiServiceError) {
        setError(error.error.message);
      }
      throw error;
    } finally {
      setIsCreating(false);
    }
  };

  const isSuccess = !isCreating && !error;

  return { isCreating, error, handleCreate, isSuccess };
}
