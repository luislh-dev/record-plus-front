import { api } from '@/services/api/api';

export const createRecordDetail = async (data: FormData) => {
  const response = await api.post('/record-details', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return response.data;
};
