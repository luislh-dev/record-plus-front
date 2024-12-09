import { HospitalListDTO } from "./HospitalListDTO";

export interface HospitalTableColumn {
  name: string;
  uuid: keyof HospitalListDTO | "actions";
  align?: "start" | "center" | "end";
  sortable?: boolean;
  render?: (hospital: HospitalListDTO) => React.ReactNode;
}
