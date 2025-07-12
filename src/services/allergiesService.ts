import { ENDPOINTS } from '@/constants/endpoints';
import type { AllergyCreateDTO } from '@/pages/allergies/types/AllergyCreateDTO';
import type { AllergyPageParams } from '@/pages/allergies/types/AllergyPageParams';
import type { AllergyPageResponse } from '@/pages/allergies/types/AllergyPageResponse';
import type { PageResponse } from '@/types/Pagination';
import { api } from './api/api';

export const getPageAllergies = async (params?: AllergyPageParams): Promise<PageResponse<AllergyPageResponse>> => {
  const response = await api.get<PageResponse<AllergyPageResponse>>(ENDPOINTS.ALERRGIES_FIND_ALL_BY, {
    params,
  });
  return response.data;
};

export const createAllergy = async (data: AllergyCreateDTO): Promise<void> => {
  await api.post<AllergyCreateDTO>(ENDPOINTS.ALLERGIES, data);
};
