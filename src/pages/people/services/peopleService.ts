import { PeopleRequestParams } from '@/pages/people/types/PeopleRequestParams';
import { api } from '@/services/api/api';
import { PageResponse } from '@/types/Pagination';
import { MainPeopleListDto } from '../types/MainPeopleListDto';
import { MinimalPeopleResponseDto } from '../types/MinimalPeopleResponseDto';
import { PeopleCreateFullDto } from '../types/PeopleCreateFullDto';
import { PeopleDetailDTO } from '../types/PeopleDetailDTO';

export const getPersonList = async (
  params?: PeopleRequestParams
): Promise<PageResponse<MainPeopleListDto>> => {
  const response = await api.get<PageResponse<MainPeopleListDto>>(
    '/people/findAllWithVisitsStats',
    {
      params
    }
  );
  return response.data;
};

export const getPersonNameByDocument = async (
  id: number,
  documentNumber: string
): Promise<MinimalPeopleResponseDto> => {
  const response = await api.get<MinimalPeopleResponseDto>(
    `/people/getPersonNameByDocument/${id}/${documentNumber}`
  );
  return response.data;
};

export const createPerson = async (data: PeopleCreateFullDto): Promise<void> => {
  await api.post('/people', data);
};

export const getPeopleDetail = async (id: string): Promise<PeopleDetailDTO> => {
  const response = await api.get<PeopleDetailDTO>(`/records/${id}/getPeople`);
  return response.data;
};
