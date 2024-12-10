import { FilterList } from "@/icons/FIlterList";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { Key, useEffect, useState } from "react";
import { ArrowUp } from "@/icons/ArrowUp";
import { ArrowDown } from "@/icons/ArrowDown";
import { HOSPITAL_SORTABLE_FIELDS } from "../constants/sortableFields";
import { SortConfig, SortDirection } from "@/types/sorting";

interface DropDownSortProps {
  selectedSort?: SortConfig;
  onSortSelected: (value: string) => void;
}

export function DropDownSort({
  onSortSelected,
  selectedSort,
}: DropDownSortProps) {
  const [currentSort, setCurrentSort] = useState<SortConfig>({
    field: "name",
    direction: SortDirection.ASC,
  });

  useEffect(() => {
    if (selectedSort) {
      setCurrentSort(selectedSort);
    }
  }, [selectedSort]);

  const handleAction = (key: Key) => {
    const field = key.toString();
    const direction =
      currentSort.field === field && currentSort.direction === SortDirection.ASC
        ? SortDirection.DESC
        : SortDirection.ASC;

    setCurrentSort({ field, direction });
    console.log({ field, direction });
    onSortSelected(field);
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
        {Object.values(HOSPITAL_SORTABLE_FIELDS).map((field) => (
          <DropdownItem
            key={field.field}
            textValue={field.field}
            aria-label={`ordenar por ${field.label.toLowerCase()}`}
            endContent={
              currentSort.field === field.field ? (
                currentSort.direction === SortDirection.ASC ? (
                  <ArrowUp />
                ) : (
                  <ArrowDown />
                )
              ) : null
            }
          >
            {field.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
