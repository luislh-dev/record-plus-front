import { PageRequest } from "@/types/Pagination";
import { State } from "@/types/state";
import { HospitalListDTO } from "./HospitalListDTO";

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

export interface HospitalTableColumn {
  name: string;
  uuid: keyof HospitalListDTO | "actions";
  align?: "start" | "center" | "end";
  sortable?: boolean;
  render?: (hospital: HospitalListDTO) => React.ReactNode;
}
