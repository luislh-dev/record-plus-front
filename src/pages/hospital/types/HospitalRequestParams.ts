import { PageRequest } from "@/types/page/PageRequest";

export interface HospitalRequestParams extends PageRequest {
  name?: string;
  ruc?: string;
  id?: number;
  stateId?: number;
}

export interface HospitalFindByNameParams extends PageRequest {
  name: string;
}
