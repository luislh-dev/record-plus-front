import { api } from "@/services/api/api";
import { MinimalPeopleResponseDto } from "../types/MinimalPeopleResponseDto";

export const getPersonNameByDni = async (dni: string): Promise<MinimalPeopleResponseDto> => {
  const response = await api.get<MinimalPeopleResponseDto>(`/people/getPersonName/${dni}`);
  return response.data;
};
