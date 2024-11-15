import { HospitalTable } from "@/components/HospitalTable";
import { useHospitalContext } from "@/contexts/hospital/hospitalContext";
import { HospitalProvider } from "@/contexts/hospital/hospitalProvider";
import { SearchIcon } from "@/icons/SearchIcon";
import { Button, Input } from "@nextui-org/react";

const SearchComponent = () => {
  const { setSearchQuery } = useHospitalContext();

  const handleSearch = (value: string) => {
    setSearchQuery(value.trim());
  };

  return (
    <Input
      classNames={{
        base: "max-w-full sm:max-w-[15rem] h-10",
        mainWrapper: "h-full",
        input: "text-small",
        inputWrapper:
          "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
      }}
      placeholder="Escriba para buscar..."
      size="sm"
      startContent={<SearchIcon size={18} />}
      type="search"
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
};

export function Hospital() {
  return (
    <HospitalProvider>
      <div className="flex flex-row items-center justify-between mx-3">
        <h1 className="text-3xl font-bold">Hospitales</h1>
        <Button color="primary">Agregar Hospital</Button>
      </div>
      <div className="mx-4 pb-6 pt-3">
        <SearchComponent />
      </div>
      <HospitalTable />
    </HospitalProvider>
  );
}
