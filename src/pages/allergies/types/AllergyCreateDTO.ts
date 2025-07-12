import type { AllergyCategory } from '@/common/enum/AllergyCategory';

export interface AllergyCreateDTO {
  name: string;
  description?: string;
  category: AllergyCategory;
}
