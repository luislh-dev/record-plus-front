import { CE_ID, DNI_ID } from '@/constants/documentType';
import { ApiServiceError } from '@/services/api/ApiErrorHandler';
import { useEffect, useState } from 'react';
import { getPersonNameByDocument } from '../services/peopleService';
import { MinimalPeopleResponseDto } from '../types/MinimalPeopleResponseDto';

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

interface UseSearchPersonConfig {
  onPersonFound?: (person: MinimalPeopleResponseDto | null) => void;
}

export const useSearchPerson = (config?: UseSearchPersonConfig): UseSearchPersonProps => {
  const [documentNumber, setDocumentNumber] = useState('');
  const [documentType, setDocumentType] = useState(DNI_ID);
  const [searchResult, setSearchResult] = useState<MinimalPeopleResponseDto | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shouldSearch, setShouldSearch] = useState(false);

  // Función para validar el documento según el tipo
  const isValidDocument = (docNumber: string, docType: number) => {
    if (!docNumber) return false;
    if (docType === DNI_ID && docNumber.length === 8) return true;
    if (docType === CE_ID && docNumber.length === 9) return true;
    return false;
  };

  // Función para verificar si el documento está en proceso de ser completado
  const isIncompleteDocument = (docNumber: string, docType: number) => {
    if (!docNumber) return false;
    if (docType === DNI_ID && docNumber.length < 8) return true;
    if (docType === CE_ID && docNumber.length < 9) return true;
    return false;
  };

  // Efecto para manejar la limpieza de resultados cuando el input está vacío o incompleto
  useEffect(() => {
    // Limpiamos los resultados si el documento está vacío o incompleto
    if (!documentNumber || isIncompleteDocument(documentNumber, documentType)) {
      setSearchResult(null);
      setError(null);
      config?.onPersonFound?.(null);
    }
  }, [documentNumber, documentType, config]);

  // Efecto para realizar la búsqueda
  useEffect(() => {
    if (!shouldSearch) return;

    const handleSearch = async () => {
      if (!isValidDocument(documentNumber, documentType)) {
        setShouldSearch(false);
        return;
      }

      setIsSearching(true);
      try {
        const result = await getPersonNameByDocument(documentType, documentNumber);
        setSearchResult(result);
        setError(null);
        config?.onPersonFound?.(result);
      } catch (err) {
        setSearchResult(null);
        if (err instanceof ApiServiceError) {
          setError(err.message);
        } else {
          throw err;
        }
      } finally {
        setIsSearching(false);
        setShouldSearch(false);
      }
    };

    handleSearch();
  }, [documentNumber, documentType, shouldSearch, config]);

  // Función para manejar cambios en el número de documento
  const handleDocumentNumberChange = (value: string) => {
    setDocumentNumber(value);

    // Si el valor está vacío o es inválido, no activamos la búsqueda
    if (!value || !isValidDocument(value, documentType)) {
      setShouldSearch(false);
      return;
    }

    // Solo activamos la búsqueda si el documento es válido
    if (isValidDocument(value, documentType)) {
      setShouldSearch(true);
    }
  };

  // Función para manejar cambios en el tipo de documento
  const handleDocumentTypeChange = (value: number) => {
    setDocumentType(value);
    // Limpiamos los resultados cuando cambia el tipo de documento
    setSearchResult(null);
    setError(null);
    config?.onPersonFound?.(null);

    // Solo activamos la búsqueda si el documento actual es válido con el nuevo tipo
    if (isValidDocument(documentNumber, value)) {
      setShouldSearch(true);
    }
  };

  const searchPerson = (docNumber: string, docType: number) => {
    setDocumentNumber(docNumber);
    setDocumentType(docType);
    setShouldSearch(true);
  };

  const clearSearch = () => {
    setDocumentNumber('');
    setSearchResult(null);
    setError(null);
    setShouldSearch(false);
    config?.onPersonFound?.(null);
  };

  return {
    documentNumber,
    documentType,
    searchResult,
    isSearching,
    error,
    setDocumentNumber: handleDocumentNumberChange,
    setDocumentType: handleDocumentTypeChange,
    searchPerson,
    clearSearch
  };
};
