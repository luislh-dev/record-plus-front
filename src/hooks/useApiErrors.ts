import type { ApiError } from '@/types/errros/ApiError';
import { useCallback, useEffect, useState } from 'react';

export const useApiErrors = (apiErrors: ApiError | null | undefined) => {
  const [backendErrors, setBackendErrors] = useState<Record<string, string>>({});

  const parseErrors = useCallback((details: string[]) => {
    const parsed: Record<string, string> = {};
    for (const detail of details) {
      const [field, message] = detail.split(': ');
      parsed[field.toLowerCase()] = message;
    }
    return parsed;
  }, []);

  const resetErrors = useCallback(() => setBackendErrors({}), []);

  useEffect(() => {
    if (apiErrors?.details) {
      setBackendErrors(parseErrors(apiErrors.details));
    } else {
      resetErrors();
    }
  }, [apiErrors, parseErrors, resetErrors]);

  return {
    backendErrors,
    resetErrors,
  };
};
