import { PageRequest } from "@/types/Pagination";
import { State } from "@/types/state";

export interface Hospital {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  ruc: string;
  state: State;
}

export interface HospitalSearchParams extends PageRequest {
  name?: string;
  ruc?: string;
  id?: number;
  stateId?: number;
}
