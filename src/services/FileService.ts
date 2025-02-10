import { api } from './api/api';

export const getPresignedUrlByObjectKey = async (objectKey: string): Promise<string | null> => {
  const response = await api.get<string>('/r2/presigned-url', {
    params: {
      objectKey
    }
  });
  return response.data;
};
