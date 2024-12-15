import { Typography } from "@/components/Typography";
import { useHospitalGetByName } from "@/pages/hospital/hooks/useHospitalGetBy";
import { ApiError } from "@/types/errros/ApiError";
import { allowOnlyNumbers } from "@/utils/allowOnlyNumbers";
import { Autocomplete, AutocompleteItem, Input } from "@nextui-org/react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { useState } from "react";
import { UserManagementCreateValues } from "../models/userManagementCreateSchema";

interface Props {
  onSubmit: (data: UserManagementCreateValues) => void;
  isSubmitting?: boolean;
  defaultValues?: UserManagementCreateValues;
  apiErrors?: ApiError | null;
}

export const ManagementForm = ({}: Props) => {
  const { hospitals, isLoading, fetchNextPage, hasNextPage, setSearchTerm } =
    useHospitalGetByName();

  const [isOpen, setIsOpen] = useState(false);

  const [, scrollerRef] = useInfiniteScroll({
    hasMore: hasNextPage,
    isEnabled: isOpen,
    shouldUseLoader: false,
    onLoadMore: fetchNextPage,
  });

  return (
    <section className="flex flex-col gap-5">
      <header>
        <Typography as="h3" variant="record-title">
          Registro de usuario
        </Typography>
        <Typography as="p" variant="body-small">
          Complete el formulario para crear un nuevo usuario. Comience ingresando el DNI para la
          validación automática.
        </Typography>
      </header>
      <form onSubmit={() => {}} className="flex flex-col gap-4">
        <div>
          <Input
            type="text"
            label="DNI"
            labelPlacement="outside"
            placeholder="Ingrese DNI"
            onInput={allowOnlyNumbers}
          />
        </div>
        <div>
          <Autocomplete
            label="Buscar Hospital"
            placeholder="Ingrese el nombre del hospital"
            items={hospitals}
            isLoading={isLoading}
            scrollRef={scrollerRef}
            onOpenChange={setIsOpen}
            onInputChange={(value) => setSearchTerm(value)}
            labelPlacement="outside"
          >
            {(item) => <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>}
          </Autocomplete>
        </div>
      </form>
    </section>
  );
};
