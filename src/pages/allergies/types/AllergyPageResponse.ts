import type { UUID } from 'node:crypto';

export type AllergyPageResponse = {
  id: UUID;
  code: string;
  name: string;
  category: string;
  status: string;
};
