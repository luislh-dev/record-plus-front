import { FilterList } from "@/icons/FIlterList";
import { SortConfig } from "@/types/Pagination";
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
    direction: "asc",
  });

  useEffect(() => {
    if (selectedSort) {
      setCurrentSort(selectedSort);
    }
  }, [selectedSort]);

  const handleAction = (key: Key) => {
    const field = key.toString();
    const direction =
      currentSort.field === field && currentSort.direction === "asc"
        ? "desc"
        : "asc";

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
                currentSort.direction === "asc" ? (
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
