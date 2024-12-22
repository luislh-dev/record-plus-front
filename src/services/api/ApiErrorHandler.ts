import { ApiError } from '@/types/errros/ApiError';
import { AxiosError } from 'axios';

export class ApiServiceError extends Error {
  constructor(public error: ApiError) {
    super(error.message);
    this.name = 'ApiServiceError';
  }
}

export const handleApiError = (error: AxiosError) => {
  if (error.response?.data) {
    throw new ApiServiceError(error.response.data as ApiError);
  }
  throw error;
};
