import type { PageRequest } from '@/types/page/PageRequest';

export interface AllergyPageParams extends PageRequest {
  name?: string;
  status?: string;
}
