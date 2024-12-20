import { DNI_ID } from "@/constants/documentType";
import { UserManagementCreateValues } from "@/pages/user/models/userManagementCreateSchema";
import { useEffect, useState } from "react";
import { UseFormReset } from "react-hook-form";
import { PeopleCreateRequiredValues } from "../models/peopleCreateRequiredSchema";
import { MinimalPeopleResponseDto } from "../types/MinimalPeopleResponseDto";
import { useCreateRequeridPerson } from "./useCreatePerson";
import { useGetPersonByDni } from "./useGetPerson";

interface UsePersonSearchProps {
  onSearchSuccess?: (person: MinimalPeopleResponseDto) => void;
  reset: UseFormReset<UserManagementCreateValues>;
}

interface UsePersonSearchResult {
  documentNumber: string;
  documentId: number;
  isSearching: boolean;
  isCreating: boolean;
  personData: MinimalPeopleResponseDto | null;
  setDocumentNumber: (value: string) => void;
  setDocumentId: (value: number) => void;
  handleCreatePerson: (data: PeopleCreateRequiredValues) => Promise<void>;
}

export const usePersonSearch = ({
  onSearchSuccess,
  reset,
}: UsePersonSearchProps): UsePersonSearchResult => {
  const [documentNumber, setDocumentNumber] = useState("");
  const [documentId, setDocumentId] = useState(DNI_ID);
  const { isLoading: isSearching, getPerson, person } = useGetPersonByDni();
  const { isCreating, handleCreate } = useCreateRequeridPerson();

  // Efecto para actualizar el formulario con los datos de la persona
  useEffect(() => {
    if (!person) return;

    const formData = {
      personDNI: documentNumber,
      personalInfo: {
        name: person.name,
        surnames: `${person.fatherLastName} ${person.motherLastName}`,
        phone: person.phone,
      },
    };

    reset((prevData) => ({
      ...prevData,
      ...formData,
    }));
  }, [person, documentNumber, reset]);

  // Efecto para manejar la búsqueda automática
  useEffect(() => {
    if (person && onSearchSuccess) {
      onSearchSuccess(person);
    }
  }, [person]);

  // Efecto para buscar la persona
  useEffect(() => {
    const searchPerson = async () => {
      if (documentNumber.length >= 8 && documentNumber.length <= 10 && documentId) {
        await getPerson(documentId, documentNumber);
      }
    };

    const timeoutId = setTimeout(() => {
      searchPerson();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [documentNumber, documentId]);

  const handleCreatePerson = async (data: PeopleCreateRequiredValues) => {
    try {
      const createdPerson = await handleCreate(data);
      const personData = {
        name: data.name,
        fatherLastName: data.paternalSurname,
        motherLastName: data.maternalSurname,
        phone: data.phone ?? "",
        hasExternalSource: true,
      };

      // Actualizar el formulario después de crear la persona
      reset((prevData) => ({
        ...prevData,
        personDNI: documentNumber,
        personalInfo: {
          name: personData.name,
          surnames: `${personData.fatherLastName} ${personData.motherLastName}`,
          phone: personData.phone,
        },
      }));

      return createdPerson;
    } catch (error) {
      console.error("Error creating person:", error);
      throw error;
    }
  };

  return {
    documentNumber,
    documentId,
    isSearching,
    isCreating,
    personData: person,
    setDocumentNumber,
    setDocumentId,
    handleCreatePerson,
  };
};
