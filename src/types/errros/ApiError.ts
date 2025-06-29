export interface ApiError {
  code: string;
  message: string;
  details: ApiErrorDetail[];
  timestamp: string;
  status?: number;
}

interface ApiErrorDetail {
  field: string;
  message: string;
}
