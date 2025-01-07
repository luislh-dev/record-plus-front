import { api } from '@/services/api/api';
import { PageResponse } from '@/types/Pagination';
import { RecordDetailListResponseDto } from '../types/RecordDetailListResponseDto';
import { RecordDetailRequestParams } from '../types/RecordDetailRequestParams';

export const createRecordDetail = async (data: FormData) => {
  const response = await api.post('/record-details', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return response.data;
};

export const getRecordDetailList = async (
  peopleId: string,
  params?: RecordDetailRequestParams
): Promise<PageResponse<RecordDetailListResponseDto>> => {
  const response = await api.get<PageResponse<RecordDetailListResponseDto>>(
    `/record-details/findAllByPeopleId/${peopleId}`,
    {
      params
    }
  );

  return response.data;
};
