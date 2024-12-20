import { api } from "@/services/api/api";
import { MinimalPeopleResponseDto } from "../types/MinimalPeopleResponseDto";
import { PeopleCreateFullDto } from "../types/PeopleCreateFullDto";

export const getPersonNameByDni = async (dni: string): Promise<MinimalPeopleResponseDto> => {
  const response = await api.get<MinimalPeopleResponseDto>(`/people/getPersonName/${dni}`);
  return response.data;
};

export const getPersonNameByDocument = async (
  id: number,
  documentNumber: string,
): Promise<MinimalPeopleResponseDto> => {
  const response = await api.get<MinimalPeopleResponseDto>(
    `/people/getPersonNameByDocument/${id}/${documentNumber}`,
  );
  return response.data;
};

export const createPerson = async (data: PeopleCreateFullDto): Promise<void> => {
  await api.post("/people", data);
};
