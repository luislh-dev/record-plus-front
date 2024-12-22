import { ApiError } from './errros/ApiError';

export interface MutationState {
  isLoading: boolean;
  error: ApiError | null;
}
