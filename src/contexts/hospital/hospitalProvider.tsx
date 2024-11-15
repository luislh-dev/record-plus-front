// HospitalProvider.tsx
import { HospitalContext } from "./hospitalContext";
import { useHospitals } from "@/hooks/hospital/useHospital";

export const HospitalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const hospitalState = useHospitals();

  return (
    <HospitalContext.Provider value={hospitalState}>
      {children}
    </HospitalContext.Provider>
  );
};
