import { createContext, useContext } from "react";
import { HospitalContextType } from "./HospitalContextType";

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
