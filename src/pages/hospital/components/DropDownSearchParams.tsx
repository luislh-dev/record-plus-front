import { SearchParam } from "@/types/SearchParam";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useState } from "react";

interface SearchParamsDropdownProps {
  params: SearchParam[];
  onParamsChange: (selectedParams: string[]) => void;
}
export function SearchParamsDropdown({
  params,
  onParamsChange,
}: SearchParamsDropdownProps) {
  const [selectedParams, setSelectedParams] = useState<Set<string>>(
    new Set([params[0]?.id])
  );

  const handleSelectionChange = (keys: Set<string>) => {
    setSelectedParams(keys);
    onParamsChange(Array.from(keys));
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button aria-label="Seleccionar parametros">
          Buscar por {params.find((param) => param.id === selectedParams.values().next().value)?.label}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        closeOnSelect={false}
        selectionMode="single"
        disallowEmptySelection
        selectedKeys={selectedParams}
        onSelectionChange={(keys) => handleSelectionChange(keys as Set<string>)}
        items={params}
      >
        {(param) => <DropdownItem key={param.id}>{param.label}</DropdownItem>}
      </DropdownMenu>
    </Dropdown>
  );
}
