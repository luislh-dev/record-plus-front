import { useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import { MinimalPeopleResponseDto } from "../types/MinimalPeopleResponseDto";
import { useGetPersonByDni } from "./useGetPerson";

interface UsePeopleModalResult {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  documentNumber: string;
  personData: MinimalPeopleResponseDto | null;
  isSearching: boolean;
  handleDniSearch: (dni: string) => Promise<void>;
  handleModalConfirm: (data: MinimalPeopleResponseDto) => void;
}

export const usePeopleModal = (
  onSuccess: (data: MinimalPeopleResponseDto) => void,
): UsePeopleModalResult => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [documentNumber, setDocumentNumber] = useState("");
  const { isLoading: isSearching, getPerson, person } = useGetPersonByDni();

  const handleDniSearch = async (dni: string) => {
    await getPerson(dni);
    setDocumentNumber(dni);
    onOpen();
  };

  const handleModalConfirm = (data: MinimalPeopleResponseDto) => {
    onSuccess(data);
    onClose();
  };

  return {
    isOpen,
    onOpen,
    onClose,
    documentNumber,
    personData: person,
    isSearching,
    handleDniSearch,
    handleModalConfirm,
  };
};
