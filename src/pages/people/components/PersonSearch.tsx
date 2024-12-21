import { DocumentTypeSelect } from "@/components/DocumentTypeSelect";
import { allowOnlyNumbers } from "@/utils/allowOnlyNumbers";
import { Input } from "@nextui-org/react";
import { FC, useEffect } from "react";
import { useSearchPerson } from "../stores/useSearchPerson";
import { MinimalPeopleResponseDto } from "../types/MinimalPeopleResponseDto";

export const PersonSearch: FC<{
  onPersonFound: (person: MinimalPeopleResponseDto | null) => void;
}> = ({ onPersonFound }) => {
  const {
    documentNumber,
    setDocumentType,
    isSearching,
    searchResult,
    setDocumentNumber,
    documentType,
  } = useSearchPerson();

  useEffect(() => {
    onPersonFound(searchResult);
  }, [searchResult]);

  return (
    <div className="flex w-full gap-4">
      <div className="w-1/3">
        <DocumentTypeSelect
          value={documentType.toString()}
          onChange={setDocumentType}
          isDisabled={isSearching}
        />
      </div>

      <Input
        className="w-2/3"
        value={documentNumber}
        onChange={(e) => setDocumentNumber(e.target.value)}
        isDisabled={isSearching}
        labelPlacement="outside"
        onInput={allowOnlyNumbers}
        label="Número de documento"
        placeholder="Ingrese número de documento"
      />
    </div>
  );
};
