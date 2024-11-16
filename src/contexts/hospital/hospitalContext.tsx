// hospitalContext.ts
import { createContext, useContext } from "react";
import { HospitalListDTO } from "@/types/DTO/hospital/HospitalListDTO";

interface HospitalContextType {
  hospitals: HospitalListDTO[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  setPage: (page: number) => void;
  setSearchQuery: (query: string) => void;
}

export const HospitalContext = createContext<HospitalContextType | undefined>(
  undefined
);

export const useHospitalContext = () => {
  const context = useContext(HospitalContext);
  if (!context) {
    throw new Error(
      "useHospitalContext debe usarse dentro de un HospitalProvider"
    );
  }
  return context;
};
