import type { ApiError, ApiErrorDetail } from '@/types/errros/ApiError';
import { useCallback, useEffect, useState } from 'react';

export const useApiErrors = (apiErrors: ApiError | null | undefined) => {
  const [backendErrors, setBackendErrors] = useState<Record<string, string>>({});

  const parseErrors = useCallback((details: ApiErrorDetail[]) => {
    const parsed: Record<string, string> = {};
    for (const detail of details) {
      if (detail.field) {
        parsed[detail.field] = detail.message;
      } else {
        parsed.general = detail.message;
      }
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
