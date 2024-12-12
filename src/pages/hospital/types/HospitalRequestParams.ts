import { PageRequest } from "@/types/page/PageRequest";

export interface HospitalRequestParams extends PageRequest {
  name?: string;
  ruc?: string;
  id?: number;
  stateId?: number;
}
