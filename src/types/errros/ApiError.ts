export interface ApiError {
  code: string;
  message: string;
  details: ApiErrorDetail[];
  timestamp: string;
  status?: number;
}

export interface ApiErrorDetail {
  field: string;
  message: string;
}
