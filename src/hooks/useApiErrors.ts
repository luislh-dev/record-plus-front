import type { ApiError } from '@/types/errros/ApiError';
import { useEffect, useState } from 'react';

export const useApiErrors = (apiErrors: ApiError | null | undefined) => {
  const [backendErrors, setBackendErrors] = useState<Record<string, string>>({});

  const parseErrors = (details: string[]) => {
    const parsed: Record<string, string> = {};
    for (const detail of details) {
      const [field, message] = detail.split(': ');
      parsed[field.toLowerCase()] = message;
    }
    return parsed;
  };

  const resetErrors = () => setBackendErrors({});

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (apiErrors?.details) {
      setBackendErrors(parseErrors(apiErrors.details));
    } else {
      resetErrors();
    }
  }, [apiErrors]);

  return {
    backendErrors,
    resetErrors,
  };
};
