import { State } from "@/types/state";
import { api } from "./api/api";

export const getStates = async (): Promise<State[]> => {
  const response = await api.get<State[]>("/state");
  return response.data;
};
