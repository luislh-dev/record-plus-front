import { HospitalTable } from "@/components/HospitalTable";
import { SearchIcon } from "@/icons/SearchIcon";
import { Button, Input } from "@nextui-org/react";

export function Hospital() {
  return (
    <>
      <div className="flex flex-row items-center justify-between mx-3">
        <h1 className="text-3xl font-bold">Hospitales</h1>
        <Button color="primary">Agregar Hospital</Button>
      </div>
      <div className="mx-4 pb-6 pt-3">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[15rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />
      </div>
      <HospitalTable />
    </>
  );
}
