import { Selected } from "@/types/Selected";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Selection,
} from "@nextui-org/react";
import { useState } from "react";

interface Props {
  data: Selected[];
  selected: (selected: Selected[]) => void;
  label?: string;
}

export function DropDownSearchParams({
  data,
  selected,
  label = "Sin información",
}: Props) {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(() => {
    return data.length > 0 ? new Set([data[0].UUID]) : new Set([]);
  });

  const handleSelectionChange = (keys: Selection) => {
    setSelectedKeys(keys);

    const selectedItems = Array.from(keys as Set<string>)
      .map((key) => data.find((item) => item.UUID === key))
      .filter((item): item is Selected => item !== undefined);

    selected(selectedItems);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button aria-label="abrir, para los parámetros de búsqueda">
          Parámetros -{" "}
          {selectedKeys === "all"
            ? "Todos"
            : (selectedKeys as Set<string>).size}{" "}
          seleccionados
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label={label}
        closeOnSelect={false}
        selectionMode="multiple"
        disallowEmptySelection
        selectedKeys={selectedKeys}
        onSelectionChange={handleSelectionChange}
      >
        {data.map((item) => (
          <DropdownItem key={item.UUID}>{item.label}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
