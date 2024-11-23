import { Button, Input } from "@nextui-org/react";
import { DropDownFilter } from "./DropDrownFilter";
import { FilterList } from "@/icons/FIlterList";
import { Search } from "@/icons/Search";

interface SearchBarProps {
  searchTerm: string;
  onSearch: (term: string) => void;
  selectedState: number | null;
  onStateChange: (state: number | null) => void;
}

export function SearchBar({
  searchTerm,
  onSearch,
  selectedState,
  onStateChange,
}: SearchBarProps) {
  return (
    <search className="px-2 pb-2 pt-4 flex gap-x-4">
      <Input
        classNames={{
          base: "max-w-full sm:max-w-[15rem] h-10",
          mainWrapper: "h-full",
          input: "text-small",
          inputWrapper:
            "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
        }}
        onClear={() => onSearch("")}
        type="text"
        placeholder="Buscar hospital..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        startContent={<Search />}
      />
      <DropDownFilter
        onStateChange={onStateChange}
        selectedState={selectedState}
      />
      <Button>
        <FilterList />
        Ordenar
      </Button>
    </search>
  );
}
