import { HospitalListDTO } from "@/pages/hospital/types/HospitalListDTO";
import { api } from "@/services/api/api";
import { PageResponse } from "@/types/Pagination";
import { HospitalCreateRequest } from "@/pages/hospital/types/HospitalCreateRequest";
import { HospitalRequestParams } from "../types/HospitalRequestParams";

export const getHospitals = async (
  params?: HospitalRequestParams
): Promise<PageResponse<HospitalListDTO>> => {
  const response = await api.get<PageResponse<HospitalListDTO>>("/hospitals", {
    params,
  });
  return response.data;
};

export const createHospital = async (
  hospitalData: HospitalCreateRequest
): Promise<HospitalCreateRequest> => {
  const response = await api.post<HospitalCreateRequest>(
    "/hospitals",
    hospitalData
  );
  return response.data;
};

export const deleteHospital = async (id: number): Promise<void> => {
  await api.delete(`/hospitals/${id}`);
};

export const updateHospital = async (
  id: number,
  data: HospitalCreateRequest
) => {
  const response = await api.patch<HospitalCreateRequest>(
    `/hospitals/${id}`,
    data
  );
  return response.data;
};

export const getHospital = async (
  id: number
): Promise<HospitalCreateRequest> => {
  const response = await api.get<HospitalCreateRequest>(`/hospitals/${id}`);
  return response.data;
};
