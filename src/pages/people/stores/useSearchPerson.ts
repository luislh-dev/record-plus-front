import { CE_ID, DNI_ID } from "@/constants/documentType";
import { ApiServiceError } from "@/services/api/ApiErrorHandler";
import { useEffect, useState } from "react";
import { getPersonNameByDocument } from "../services/peopleService";
import { MinimalPeopleResponseDto } from "../types/MinimalPeopleResponseDto";

interface UseSearchPersonProps {
  documentNumber: string;
  documentType: number;
  searchResult: MinimalPeopleResponseDto | null;
  isSearching: boolean;
  error: string | null;
  setDocumentNumber: (value: string) => void;
  setDocumentType: (value: number) => void;
  searchPerson: (documentNumber: string, documentType: number) => void;
  clearSearch: () => void;
}

export const useSearchPerson = (): UseSearchPersonProps => {
  const [documentNumber, setDocumentNumber] = useState("");
  const [documentType, setDocumentType] = useState(DNI_ID);
  const [searchResult, setSearchResult] = useState<MinimalPeopleResponseDto | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Verificar si hay un resultado
    if (searchResult) {
      clearSearch();
    }
    // Verificar si el tipo de documento es DNI
    if (documentType === DNI_ID) {
      // Verificar si la longitud del documento es igual a 8
      if (documentNumber.length === 8) {
        // Buscar a la persona por DNI
        searchPerson(documentNumber, documentType);
      }
    }

    // Verificar si el tipo de documento es CE
    if (documentType === CE_ID) {
      // Verificar si la longitud del documento es mayor o igual a 12
      if (documentNumber.length === 9) {
        // Buscar a la persona por CE
        searchPerson(documentNumber, documentType);
      }
    }
  }, [documentNumber, documentType]);

  const searchPerson = async (documentNumber: string, documentType: number) => {
    setIsSearching(true);

    try {
      const result = await getPersonNameByDocument(documentType, documentNumber);
      setSearchResult(result);
      setError(null);
    } catch (err) {
      setSearchResult(null);

      if (err instanceof ApiServiceError) {
        setError(err.message);
      } else {
        throw err;
      }
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchResult(null);
    setError(null);
  };

  return {
    documentNumber,
    documentType,
    searchResult,
    isSearching,
    error,
    setDocumentNumber,
    setDocumentType,
    searchPerson,
    clearSearch,
  };
};
