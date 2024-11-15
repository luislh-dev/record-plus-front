import { HospitalListDTO } from "@/types/DTO/HospitalListDTO";
import { api } from "./api";
import { PageRequest, PageResponse } from "@/types/Pagination";

export const getHospitals = async (
  pageRequest: PageRequest
): Promise<PageResponse<HospitalListDTO>> => {
  const { pageNumber, pageSize, sort } = pageRequest;
  const response = await api.get<PageResponse<HospitalListDTO>>("/hospitals", {
    params: {
      page: pageNumber,
      size: pageSize,
      ...(sort && { sort: `${sort.field},${sort.direction}` }),
    },
  });
  return response.data;
};
