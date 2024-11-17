import { AxiosError } from "axios";

export interface ApiError {
  code: string;
  message: string;
  details: string[];
  timestamp: string;
}

export class ApiServiceError extends Error {
  constructor(public error: ApiError) {
    super(error.message);
    this.name = "ApiServiceError";
  }
}

export const handleApiError = (error: AxiosError) => {
  if (error.response?.data) {
    throw new ApiServiceError(error.response.data as ApiError);
  }
  throw error;
};
