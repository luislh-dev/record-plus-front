import type { AllergyCategory } from '@/common/enum/AllergyCategory';
import type { AllergyCreateValues } from '../models/allergyCreateSchema';
import type { AllergyCreateDTO } from '../types/AllergyCreateDTO';

export const allergyCreateToDTO = (values: AllergyCreateValues): AllergyCreateDTO => ({
  name: values.name,
  description: values.description,
  category: values.category as AllergyCategory,
});
