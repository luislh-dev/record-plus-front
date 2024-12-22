import { useEffect, useState } from 'react';
import { ApiError } from '@/types/errros/ApiError';

export const useApiErrors = (apiErrors: ApiError | null | undefined) => {
  const [backendErrors, setBackendErrors] = useState<Record<string, string>>({});

  const parseErrors = (details: string[]) => {
    const parsed: Record<string, string> = {};
    details.forEach(detail => {
      const [field, message] = detail.split(': ');
      parsed[field.toLowerCase()] = message;
    });
    return parsed;
  };

  const resetErrors = () => setBackendErrors({});

  useEffect(() => {
    if (apiErrors?.details) {
      setBackendErrors(parseErrors(apiErrors.details));
    } else {
      resetErrors();
    }
  }, [apiErrors]);

  return {
    backendErrors,
    resetErrors
  };
};
