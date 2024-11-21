import { useGenericSearch } from "@/hooks/generic/useGenericSearch";
import { HospitalSearchParams } from "../types/hospital";
import { HospitalListDTO } from "../types/HospitalListDTO";
import { getHospitals } from "../service/hospitalService";

interface UseParams {
  initialPageSize?: number;
  searchDelay?: number;
}

export function useHospitalList(params: UseParams = {}) {
  return useGenericSearch<HospitalListDTO, HospitalSearchParams>({
    ...params,
    fetchData: getHospitals,
  });
}
