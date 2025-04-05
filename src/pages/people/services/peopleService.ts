import type { DocumentTypeName } from '@/common/enum/DocumentType';
import type { PeopleRequestParams } from '@/pages/people/types/PeopleRequestParams';
import { api } from '@/services/api/api';
import type { PageResponse } from '@/types/Pagination';
import type { MainPeopleListDto } from '../types/MainPeopleListDto';
import type { MinimalPeopleResponseDto } from '../types/MinimalPeopleResponseDto';
import type { PeopleCreateFullDto } from '../types/PeopleCreateFullDto';
import type { PeopleDetailDTO } from '../types/PeopleDetailDTO';

export const getPersonList = async (
  params?: PeopleRequestParams,
): Promise<PageResponse<MainPeopleListDto>> => {
  const response = await api.get<PageResponse<MainPeopleListDto>>(
    '/people/findAllWithVisitsStats',
    {
      params,
    },
  );
  return response.data;
};

export const getPersonNameByDocument = async (
  documentType: DocumentTypeName,
  documentNumber: string,
): Promise<MinimalPeopleResponseDto> => {
  const response = await api.get<MinimalPeopleResponseDto>(
    `/people/getPersonNameByDocument/${documentType}/${documentNumber}`,
  );
  return response.data;
};

export const createPerson = async (data: PeopleCreateFullDto): Promise<void> => {
  await api.post('/people', data);
};

export const getPeopleDetail = async (id: string): Promise<PeopleDetailDTO> => {
  const response = await api.get<PeopleDetailDTO>(`/people/findBasicById/${id}`);
  return response.data;
};
