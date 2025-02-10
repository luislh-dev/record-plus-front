import type { HospitalCreateRequest } from '@/pages/hospital/types/HospitalCreateRequest';
import type { HospitalListDTO } from '@/pages/hospital/types/HospitalListDTO';
import { api } from '@/services/api/api';
import type { PageResponse } from '@/types/Pagination';
import type { HospitalNameListDTO } from '../types/HospitalNameListDTO';
import type {
  HospitalFindByNameParams,
  HospitalRequestParams,
} from '../types/HospitalRequestParams';

export const getHospitals = async (
  params?: HospitalRequestParams,
): Promise<PageResponse<HospitalListDTO>> => {
  const response = await api.get<PageResponse<HospitalListDTO>>('/hospitals', {
    params,
  });
  return response.data;
};

export const createHospital = async (
  hospitalData: HospitalCreateRequest,
): Promise<HospitalCreateRequest> => {
  const response = await api.post<HospitalCreateRequest>('/hospitals', hospitalData);
  return response.data;
};

export const deleteHospital = async (id: number): Promise<void> => {
  await api.delete(`/hospitals/${id}`);
};

export const updateHospital = async (id: number, data: HospitalCreateRequest) => {
  const response = await api.patch<HospitalCreateRequest>(`/hospitals/${id}`, data);
  return response.data;
};

export const getHospital = async (id: number): Promise<HospitalCreateRequest> => {
  const response = await api.get<HospitalCreateRequest>(`/hospitals/${id}`);
  return response.data;
};

export const getHospitalsByName = async (
  params: HospitalFindByNameParams,
): Promise<PageResponse<HospitalNameListDTO>> => {
  const response = await api.get<PageResponse<HospitalNameListDTO>>('/hospitals/findByName', {
    params,
  });
  return response.data;
};
