import { ApiServiceError } from "@/services/api/ApiErrorHandler";
import { useState } from "react";
import { getPersonNameByDni } from "../services/peopleService";
import { MinimalPeopleResponseDto } from "../types/MinimalPeopleResponseDto";

export function useGetPersonByDni() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<ApiServiceError | null>(null);
  const [person, setPerson] = useState<MinimalPeopleResponseDto | null>(null);

  const getPerson = async (dni: string) => {
    setLoading(true);
    // llamar al servicio de creación de usuario
    try {
      setPerson(await getPersonNameByDni(dni));
    } catch (error) {
      if (error instanceof ApiServiceError) {
        setError(error);
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { isLoading, error, getPerson, person };
}
