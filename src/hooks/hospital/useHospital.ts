import { useState, useEffect } from "react";
import { HospitalListDTO } from "@/types/dto/HospitalListDTO";
import { getHospitals } from "@/services/hospitalService";

export const useHospitals = () => {
  const [hospitals, setHospitals] = useState<HospitalListDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const data = await getHospitals();
        setHospitals(data);
      } catch (err) {
        setError("Error al cargar hospitales");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  return { hospitals, loading, error };
};
