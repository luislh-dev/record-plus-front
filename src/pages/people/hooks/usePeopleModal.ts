import { useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { PeopleCreateRequiredValues } from "../models/peopleCreateRequiredSchema";
import { MinimalPeopleResponseDto } from "../types/MinimalPeopleResponseDto";
import { useCreateRequeridPerson } from "./useCreatePerson";
import { useGetPersonByDni } from "./useGetPerson";

interface UsePeopleModalResult {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  documentNumber: string;
  personData: MinimalPeopleResponseDto | null;
  isSearching: boolean;
  isCreating: boolean;
  handleDniSearch: (dni: string) => Promise<void>;
  handleCreatePerson: (data: PeopleCreateRequiredValues) => Promise<void>;
}

export const usePeopleModal = (
  onCreateSuccess: (data: MinimalPeopleResponseDto, documentNumber: string) => void,
): UsePeopleModalResult => {
  const { isOpen, onClose: closeModal, onOpen } = useDisclosure();
  const [documentNumber, setDocumentNumber] = useState("");
  const { isLoading: isSearching, getPerson, person } = useGetPersonByDni();
  const { isCreating, handleCreate } = useCreateRequeridPerson();

  const handleDniSearch = async (dni: string) => {
    if (dni.length === 8) {
      setDocumentNumber(dni);
      await getPerson(dni);
    }
  };

  useEffect(() => {
    if (person) {
      if (person.fromReniec) {
        onOpen();
      } else {
        onCreateSuccess(person, documentNumber);
      }
    }
  }, [person, onOpen]);

  const handleCreatePerson = async (data: PeopleCreateRequiredValues) => {
    try {
      await handleCreate(data);

      // Solo si la creación fue exitosa, llamamos al callback con los datos
      onCreateSuccess(
        {
          name: data.name,
          fatherLastName: data.paternalSurname,
          motherLastName: data.maternalSurname,
          phone: data.phone ?? "",
          fromReniec: true,
        },
        documentNumber,
      );

      closeModal();
    } catch (error) {
      // Manejar el error si es necesario
      console.error("Error creating person:", error);
      throw error;
    }
  };

  const onClose = () => {
    closeModal();
    setDocumentNumber("");
  };

  return {
    isOpen,
    onClose,
    onOpen,
    documentNumber,
    personData: person,
    isSearching,
    isCreating,
    handleDniSearch,
    handleCreatePerson,
  };
};
