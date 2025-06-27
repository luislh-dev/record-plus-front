import type { ApiError } from '@/types/errros/ApiError';
import type { AxiosError } from 'axios';

export class ApiServiceError extends Error {
  constructor(public error: ApiError) {
    super(error.message);
    this.name = 'ApiServiceError';
  }
}

export const handleApiError = (error: AxiosError<ApiError>) => {
  const baseError: ApiError = {
    code: 'UNKNOWN_ERROR',
    message: error.response?.data?.message || error.message || 'Error desconocido',
    details: [],
    timestamp: new Date().toISOString(),
    status: error.response?.status || 500,
  };

  if (error.response?.status === 401) {
    throw {
      ...baseError,
    };
  }

  if (error.response?.status === 403) {
    throw {
      ...baseError,
      message: 'Acceso denegado. No tienes permiso para realizar esta acción.',
    };
  }

  if (error.response?.status === 404) {
    throw {
      ...baseError,
      message: 'Recurso no encontrado.',
    };
  }

  if (error.response?.status === 500) {
    throw {
      ...baseError,
      message: 'Error interno del servidor. Por favor, inténtalo más tarde.',
    };
  }

  if (error.response?.data) {
    throw {
      ...baseError,
      ...(error.response.data as ApiError),
    };
  }

  throw baseError;
};
