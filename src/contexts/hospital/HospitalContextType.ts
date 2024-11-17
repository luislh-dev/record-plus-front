import { HospitalCreateRequest } from "@/types/DTO/hospital/HospitalCreateRequest";
import { HospitalListDTO } from "@/types/DTO/hospital/HospitalListDTO";

export interface HospitalContextType {
  hospitals: HospitalListDTO[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  setSearchQuery: (query: string) => void;
  createHospital: (
    data: HospitalCreateRequest
  ) => Promise<HospitalCreateRequest>;
  isCreating: boolean;
  createError: string | null;
  deleteHospital: (id: number) => Promise<boolean>;
  isDeleting: boolean;
  deleteError: string | null;
  updateHospital: (
    id: number,
    data: HospitalCreateRequest
  ) => Promise<HospitalCreateRequest>;
  isUpdating: boolean;
  updateError: string | null;
}
