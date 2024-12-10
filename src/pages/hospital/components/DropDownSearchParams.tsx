import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useState } from "react";
import { useSearchStore } from "../stores/searchStore";
import { SEARCH_PARAMS } from "../constants/searchParams";

export function SearchParamsDropdown() {
  const { setSearchFields } = useSearchStore();

  const [selectedParams, setSelectedParams] = useState<Set<string>>(
    new Set([SEARCH_PARAMS[0]?.id])
  );

  const handleSelectionChange = (keys: Set<string>) => {
    setSelectedParams(keys);
    setSearchFields(Array.from(keys));
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button aria-label="Seleccionar parametros">
          Buscar por{" "}
          {
            SEARCH_PARAMS.find(
              (param) => param.id === Array.from(selectedParams)[0]
            )?.label
          }
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        closeOnSelect={false}
        selectionMode="single"
        disallowEmptySelection
        selectedKeys={selectedParams}
        onSelectionChange={(keys) => handleSelectionChange(keys as Set<string>)}
        items={SEARCH_PARAMS}
      >
        {(param) => <DropdownItem key={param.id}>{param.label}</DropdownItem>}
      </DropdownMenu>
    </Dropdown>
  );
}
