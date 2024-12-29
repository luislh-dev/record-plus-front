import { ApiServiceError } from '@/services/api/ApiErrorHandler';
import { useState } from 'react';
import { createRecordDetail } from '../service/recordService';

export const useCreateRecordDetail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async (data: FormData) => {
    setIsLoading(true);
    setError(null);

    try {
      await createRecordDetail(data);
    } catch (error) {
      if (error instanceof ApiServiceError) {
        setError(error.message);
      }

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const isSuccess = !isLoading && !error;

  return { isLoading, error, handleCreate, isSuccess };
};
