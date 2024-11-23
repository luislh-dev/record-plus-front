import { FilterList } from "@/icons/FIlterList";
import { SortConfigGeneric } from "@/types/Pagination";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { Key, useState } from "react";
import { ArrowUp } from "@/icons/ArrowUp";
import { ArrowDown } from "@/icons/ArrowDown";
import { AllowedSortFields } from "../types/SortTypes";

interface DropDownSortProps {
  selectedSort?: SortConfigGeneric<AllowedSortFields>;
  onSortSelected: (value: SortConfigGeneric<AllowedSortFields>) => void;
}

const FIELD_LABELS: Record<AllowedSortFields, string> = {
  name: "Nombre",
  phone: "Teléfono",
  email: "Correo electrónico",
  ruc: "RUC",
};

export function DropDownSort({
  onSortSelected,
  selectedSort,
}: DropDownSortProps) {
  const [currentSort, setCurrentSort] = useState<
    SortConfigGeneric<AllowedSortFields>
  >(selectedSort || { field: "name", direction: "asc" });

  const handleAction = (key: Key) => {
    const selectedValue = key as AllowedSortFields;

    if (selectedValue) {
      const newDirection =
        selectedValue === currentSort.field && currentSort.direction === "asc"
          ? "desc"
          : "asc";

      const newSort: SortConfigGeneric<AllowedSortFields> = {
        field: selectedValue,
        direction: newDirection,
      };

      setCurrentSort(newSort);
      onSortSelected(newSort);
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button aria-label="Clasificar" startContent={<FilterList />}>
          Ordenar
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        variant="faded"
        disallowEmptySelection
        selectedKeys={new Set([currentSort.field])}
        onAction={handleAction}
        closeOnSelect={false}
      >
        {(Object.keys(FIELD_LABELS) as AllowedSortFields[]).map((key) => (
          <DropdownItem
            key={key}
            textValue={`Ordenar por ${FIELD_LABELS[key].toLowerCase()}`}
            aria-label={`Ordenar por ${FIELD_LABELS[key].toLowerCase()}`}
            endContent={
              key === currentSort.field &&
              (currentSort.direction === "asc" ? <ArrowUp /> : <ArrowDown />)
            }
          >
            {FIELD_LABELS[key]}{" "}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
