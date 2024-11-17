import { ReactNode } from "react";
import { HospitalContext } from "./hospitalContext";
import { useHospitals } from "@/hooks/hospital/useHospital";
import { HospitalContextType } from "./HospitalContextType";

interface HospitalProviderProps {
  children: ReactNode;
}

export const HospitalProvider = ({ children }: HospitalProviderProps) => {
  const hospitalState = useHospitals();

  const contextValue: HospitalContextType = {
    hospitals: hospitalState.hospitals,
    loading: hospitalState.loading,
    error: hospitalState.error,
    currentPage: hospitalState.currentPage,
    totalPages: hospitalState.totalPages,
    setPage: hospitalState.setPage,
    setPageSize: hospitalState.setPageSize,
    setSearchQuery: hospitalState.setSearchQuery,
    createHospital: hospitalState.createHospital,
    isCreating: hospitalState.isCreating,
    createError: hospitalState.createError,
    deleteHospital: hospitalState.deleteHospital,
    isDeleting: hospitalState.isDeleting,
    deleteError: hospitalState.deleteError,
    updateHospital: hospitalState.updateHospital,
    isUpdating: hospitalState.isUpdating,
    updateError: hospitalState.updateError,
  };

  return (
    <HospitalContext.Provider value={contextValue}>
      {children}
    </HospitalContext.Provider>
  );
};
