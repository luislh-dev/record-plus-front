import { HospitalListDTO } from "@/pages/hospital/types/dto/HospitalListDTO";
import { api } from "@/services/api/api";
import { PageResponse } from "@/types/Pagination";
import { HospitalSearchParams } from "@/types/hospital";
import { HospitalCreateRequest } from "@/pages/hospital/types/dto/HospitalCreateRequest";

export const getHospitals = async (
  params?: Partial<HospitalSearchParams>
): Promise<PageResponse<HospitalListDTO>> => {
  // Incluir únicamente parámetros no nulos o indefinidos
  const queryParams = {
    ...(params?.name && { name: params.name }),
    ...(params?.ruc && { ruc: params.ruc }),
    ...(params?.id && { id: params.id }),
    ...(params?.pageNumber !== undefined && { page: params.pageNumber }),
    ...(params?.pageSize !== undefined && { size: params.pageSize }),
    ...(params?.sort && {
      sort: `${params.sort.field},${params.sort.direction}`,
    }),
  };

  const response = await api.get<PageResponse<HospitalListDTO>>("/hospitals", {
    params: queryParams,
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
