import { PageRequest } from "@/types/page/PageRequest";

export interface UserRequestParams extends PageRequest {
  username?: string;
  dni?: string;
  hospitalName?: string;
  roleId?: number;
  stateId?: number;
}

// Tipo que excluye las propiedades heredadas de PageRequest
export type UserSearchFields = Omit<UserRequestParams, keyof PageRequest>;
