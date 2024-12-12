import { searchParamGeneric } from "@/types/SearchParam";
import { UserSearchFields } from "../types/UserRequestParams";

// Constante con los parámetros de búsqueda permitidos
export const SEARCH_PARAMS: searchParamGeneric<UserSearchFields>[] = [
  { id: "username", label: "Nombre" },
  { id: "dni", label: "DNI" },
];
