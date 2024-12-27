import { api } from '@/services/api/api';
import { RecordDetailCreateRequest } from '../types/RecordDetailCreateRequest ';

export const createRecordDetail = async (data: RecordDetailCreateRequest) => {
  const response = await api.post<RecordDetailCreateRequest>('/records/createRecordDetail', data);
  return response.data;
};
