import type { DocumentTypeName } from '@/common/enum/DocumentType';
import { ApiServiceError } from '@/services/api/ApiErrorHandler';
import type { ApiError } from '@/types/errros/ApiError';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getPeopleDetail, getPersonNameByDocument } from '../services/peopleService';
import type { MinimalPeopleResponseDto } from '../types/MinimalPeopleResponseDto';

export function useGetPersonByDni() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [person, setPerson] = useState<MinimalPeopleResponseDto | null>(null);
  const [success, setSuccess] = useState(false);

  const getPerson = async (documentType: DocumentTypeName, documentNumber: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await getPersonNameByDocument(documentType, documentNumber);
      setPerson(result);
      setSuccess(true);
    } catch (err) {
      setPerson(null);
      if (err instanceof ApiServiceError) {
        setError(err.error);
      }
      setSuccess(false);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearPerson = () => {
    setPerson(null);
    setError(null);
  };

  return { isLoading, error, getPerson, person, clearPerson, success };
}

export function useGetPersonDetailById() {
  const [id, setId] = useState<string | null>(null);

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['personDetail', id],
    queryFn: async ({ queryKey }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, personId] = queryKey;
      if (!personId) throw new Error('ID no proporcionado');
      return getPeopleDetail(personId);
    },
    enabled: !!id,
    retry: false,
  });

  return { isLoading, error, data, setId, refetch };
}
