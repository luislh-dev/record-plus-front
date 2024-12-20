import { ApiServiceError } from "@/services/api/ApiErrorHandler";
import { ApiError } from "@/types/errros/ApiError";
import { useState } from "react";
import { getPersonNameByDocument } from "../services/peopleService";
import { MinimalPeopleResponseDto } from "../types/MinimalPeopleResponseDto";

export function useGetPersonByDni() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [person, setPerson] = useState<MinimalPeopleResponseDto | null>(null);

  const getPerson = async (documentId: number, documentNumber: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await getPersonNameByDocument(documentId, documentNumber);
      setPerson(result);
    } catch (err) {
      setPerson(null);
      if (err instanceof ApiServiceError) {
        setError(err.error);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearPerson = () => {
    setPerson(null);
    setError(null);
  };

  return { isLoading, error, getPerson, person, clearPerson };
}
