import { HospitalListDTO } from "@/types/dto/HospitalListDTO";
import { api } from "./api";

export const getHospitals = async (): Promise<HospitalListDTO[]> => {
  const response = await api.get<HospitalListDTO[]>("/hospitals");
  return response.data;
};
