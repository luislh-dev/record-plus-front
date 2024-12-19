import { CustomInput } from "@/components/CustomInput";
import { CustomSelect } from "@/components/CustomSelect";
import { Typography } from "@/components/Typography";
import { useStates } from "@/hooks/state/useState";
import { useHospitalGetByName } from "@/pages/hospital/hooks/useHospitalGetBy";
import { PeopleCreateModal } from "@/pages/people/components/PeopleCreateModal";
import { usePeopleModal } from "@/pages/people/hooks/usePeopleModal";
import { MinimalPeopleResponseDto } from "@/pages/people/types/MinimalPeopleResponseDto";
import { ApiError } from "@/types/errros/ApiError";
import { allowOnlyNumbers } from "@/utils/allowOnlyNumbers";
import { zodResolver } from "@hookform/resolvers/zod";
import { Autocomplete, AutocompleteItem, Button, Input } from "@nextui-org/react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useUserManagementCreate } from "../hooks/useUserCreate";
import {
  userManagementCreateSchema,
  UserManagementCreateValues,
} from "../models/userManagementCreateSchema";

interface Props {
  onSubmit: (data: UserManagementCreateValues) => void;
  isSubmitting?: boolean;
  defaultValues?: UserManagementCreateValues;
  apiErrors?: ApiError | null;
}

export const ManagementForm = ({}: Props) => {
  const { hospitals, isLoading, fetchNextPage, hasNextPage, setSearchTerm } =
    useHospitalGetByName();

  const { isOpen, onClose, documentNumber, personData, handleDniSearch, handleModalConfirm } =
    usePeopleModal((data) => {
      setValue("personDNI", documentNumber);
      setValue("name", data.name);
    });

  const { isLoading: isSubmitting, handleCreate } = useUserManagementCreate();

  const [, scrollerRef] = useInfiniteScroll({
    hasMore: hasNextPage,
    isEnabled: isOpen,
    shouldUseLoader: false,
    onLoadMore: fetchNextPage,
  });

  const { state } = useStates();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserManagementCreateValues>({
    resolver: zodResolver(userManagementCreateSchema),
    mode: "onChange",
    defaultValues: {
      personDNI: "",
      hospitalId: 0,
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      stateId: 0,
    },
  });

  useEffect(() => {
    if (state.length > 0) {
      setValue("stateId", state[0].id);
    }
  }, [state, setValue]);

  const searchByDni = (dni: string) => {
    if (dni.length === 8) {
      handleDniSearch(dni);
    }
  };
  return (
    <>
      <PeopleCreateModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleModalConfirm}
        documentNumber={documentNumber}
        personData={personData || ({} as MinimalPeopleResponseDto)}
      />
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
        <form onSubmit={handleSubmit(handleCreate)} className="flex flex-col gap-4">
          <div>
            <CustomInput
              control={control}
              error={errors.personDNI}
              name="personDNI"
              type="text"
              label="DNI"
              placeholder="Ingrese DNI"
              onInput={allowOnlyNumbers}
              onChange={(e) => searchByDni(e.target.value)}
            />
          </div>
          <div>
            <Controller
              name="hospitalId"
              control={control}
              render={({ field: { onChange } }) => {
                return (
                  <Autocomplete
                    label="Buscar Hospital"
                    placeholder="Ingrese el nombre del hospital"
                    items={hospitals}
                    isLoading={isLoading}
                    scrollRef={scrollerRef}
                    onOpenChange={(isOpen) => {
                      if (isOpen) {
                        fetchNextPage();
                      }
                    }}
                    onInputChange={(value) => setSearchTerm(value)}
                    onSelectionChange={onChange}
                    labelPlacement="outside"
                  >
                    {(item) => <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>}
                  </Autocomplete>
                );
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              type="text"
              label="Nombre"
              labelPlacement="outside"
              placeholder="Nombre"
              disabled
            />
            <Input
              type="text"
              label="Apellidos"
              value={`${personData?.fatherLastName ?? ""} ${personData?.motherLastName ?? ""}`}
              labelPlacement="outside"
              placeholder="Apellidos"
              disabled
            />
            <Input
              type="phone"
              label="Teléfono"
              value={personData?.phone || ""}
              labelPlacement="outside"
              placeholder="Teléfono"
              disabled
            />
            <CustomInput
              name="email"
              control={control}
              label="Email"
              placeholder="Ingrese el email"
              isRequired
            />
            <CustomInput
              name="name"
              control={control}
              label="Usuario"
              placeholder="Ingrese el nombre del usuario"
              isRequired
              error={errors.name}
            />
            <CustomSelect
              name="stateId"
              control={control}
              label="Estado"
              options={state}
              isRequired
            />
            <CustomInput
              name="password"
              control={control}
              label="Contraseña"
              placeholder="Ingrese la contraseña"
              isRequired
              error={errors.password}
            />
            <CustomInput
              name="passwordConfirmation"
              control={control}
              label="Confirmar contraseña"
              placeholder="Confirme la contraseña"
              isRequired
              error={errors.passwordConfirmation}
            />
          </div>
          <div className="col-span-2 flex justify-end gap-2">
            <Button type="submit" color="primary" isLoading={isSubmitting}>
              Guardar
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};
