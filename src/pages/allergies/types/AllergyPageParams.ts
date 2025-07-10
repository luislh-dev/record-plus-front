import type { PageRequest } from '@/types/page/PageRequest';

export interface AllergyPageParams extends PageRequest {
  name?: string | null;
  code?: string | null;
  status?: string | null;
  category?: string | null;
}

export type searchParams = 'name' | 'code';
