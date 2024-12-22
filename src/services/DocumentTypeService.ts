import { DocumentType } from '@/types/DocumentType';
import { api } from './api/api';

export const getDocumentTypes = async (): Promise<DocumentType[]> => {
  const response = await api.get<DocumentType[]>('/documentType');
  return response.data;
};
