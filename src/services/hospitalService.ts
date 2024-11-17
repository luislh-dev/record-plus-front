import { HospitalListDTO } from "@/types/DTO/hospital/HospitalListDTO";
import { api } from "./api";
import { PageResponse } from "@/types/Pagination";
import { SearchParams } from "@/types/hospital";
import { HospitalCreateRequest } from "@/types/DTO/hospital/HospitalCreateRequest";

export const getHospitals = async (
  params: SearchParams
): Promise<PageResponse<HospitalListDTO>> => {
  const { pageNumber, pageSize, sort, name, ruc, id } = params;
  const response = await api.get<PageResponse<HospitalListDTO>>("/hospitals", {
    params: {
      page: pageNumber,
      size: pageSize,
      ...(sort && { sort: `${sort.field},${sort.direction}` }),
      ...(name && { name }),
      ...(ruc && { ruc }),
      ...(id && { id }),
    },
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
