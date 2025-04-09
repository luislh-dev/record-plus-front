import type { PageRequest } from '@/types/page/PageRequest';

export interface RecordDetailRequestParams extends PageRequest {
  hospitalName?: string;
  startDate?: string;
  endDate?: string;
}
