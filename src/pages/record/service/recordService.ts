import { api } from '@/services/api/api';
import type { PageResponse } from '@/types/Pagination';
import type { RecordDetailExtenseViewModel } from '../types/RecordDetailExtenseViewModel';
import type { RecordDetailListResponseDto } from '../types/RecordDetailListResponseDto';
import type { RecordDetailRequestParams } from '../types/RecordDetailRequestParams';

export const createRecordDetail = async (data: FormData) => {
  const response = await api.post('/record-details', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const getRecordDetailList = async (
  peopleId: string,
  params?: RecordDetailRequestParams,
): Promise<PageResponse<RecordDetailListResponseDto>> => {
  const response = await api.get<PageResponse<RecordDetailListResponseDto>>(
    `/record-details/findAllByPeopleId/${peopleId}`,
    {
      params,
    },
  );

  return response.data;
};

export const gerRecordDetailById = async (id: string) => {
  const response = await api.get<RecordDetailExtenseViewModel>(`/record-details/FindById/${id}`);

  return response.data;
};
