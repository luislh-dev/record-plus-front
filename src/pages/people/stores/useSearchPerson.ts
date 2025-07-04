import { DocumentTypeName } from '@/common/enum/DocumentType';
import type { ApiError } from '@/types/errros/ApiError';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getPersonNameByDocument } from '../services/peopleService';
import type { MinimalPeopleResponseDto } from '../types/MinimalPeopleResponseDto';

interface UseSearchPersonProps {
  documentNumber: string;
  documentType: DocumentTypeName;
  searchResult: MinimalPeopleResponseDto | null;
  isSearching: boolean;
  error: ApiError | null;
  setDocumentNumber: (value: string) => void;
  setDocumentType: (value: DocumentTypeName) => void;
  searchPerson: (documentNumber: string, documentType: DocumentTypeName) => void;
  clearSearch: () => void;
}

export const useSearchPerson = (): UseSearchPersonProps => {
  const [documentNumber, setDocumentNumber] = useState('');
  const [documentType, setDocumentType] = useState<DocumentTypeName>(DocumentTypeName.DNI);

  // Función para validar el documento según el tipo
  const isValidDocument = (docNumber: string, docType: DocumentTypeName) => {
    if (!docNumber) return false;
    if (docType === DocumentTypeName.DNI && docNumber.length === 8) return true;
    if (docType === DocumentTypeName.CE && docNumber.length === 9) return true;
    return false;
  };

  const query = useQuery<MinimalPeopleResponseDto, ApiError>({
    queryKey: ['search-person', documentType, documentNumber],
    queryFn: () => getPersonNameByDocument(documentType, documentNumber),
    enabled: isValidDocument(documentNumber, documentType),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 0,
  });

  const handleDocumentNumberChange = (value: string) => {
    setDocumentNumber(value);
  };

  // Función para manejar cambios en el tipo de documento
  const handleDocumentTypeChange = (value: DocumentTypeName) => {
    setDocumentType(value);
  };

  const searchPerson = (docNumber: string, docType: DocumentTypeName) => {
    setDocumentNumber(docNumber);
    setDocumentType(docType);
  };

  const clearSearch = () => {
    setDocumentNumber('');
    setDocumentType(DocumentTypeName.DNI);
  };

  return {
    documentNumber,
    documentType,
    searchResult: query.data || null,
    isSearching: query.isLoading,
    error: query.error,
    setDocumentNumber: handleDocumentNumberChange,
    setDocumentType: handleDocumentTypeChange,
    searchPerson,
    clearSearch,
  };
};
