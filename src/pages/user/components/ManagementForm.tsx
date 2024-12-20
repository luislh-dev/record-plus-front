import { CustomInput } from "@/components/CustomInput";
import { CustomSelect } from "@/components/CustomSelect";
import { Typography } from "@/components/Typography";
import { DNI_ID } from "@/constants/documentType";
import { useDocumentType } from "@/hooks/documenttype/useDocumentType";
import { useStates } from "@/hooks/state/useState";
import { useHospitalGetByName } from "@/pages/hospital/hooks/useHospitalGetBy";
import { PeopleCreateModal } from "@/pages/people/components/PeopleCreateModal";
import { usePersonSearch } from "@/pages/people/hooks/usePersonSearch";
import { MinimalPeopleResponseDto } from "@/pages/people/types/MinimalPeopleResponseDto";
import { ApiError } from "@/types/errros/ApiError";
import { allowOnlyNumbers } from "@/utils/allowOnlyNumbers";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
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
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { hospitals, isLoading, fetchNextPage, hasNextPage, setSearchTerm } =
    useHospitalGetByName();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
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
      personalInfo: {
        name: "",
        surnames: "",
        phone: "",
      },
    },
  });

  const {
    documentNumber,
    documentId,
    isSearching,
    isCreating,
    personData,
    setDocumentNumber,
    setDocumentId,
    handleCreatePerson,
  } = usePersonSearch({
    onSearchSuccess: (person) => {
      if (person.hasExternalSource) {
        onOpen();
      }
    },
    reset,
  });

  const { isLoading: isSubmitting, handleCreate } = useUserManagementCreate();

  const [, scrollerRef] = useInfiniteScroll({
    hasMore: hasNextPage,
    isEnabled: isOpen,
    shouldUseLoader: false,
    onLoadMore: fetchNextPage,
  });

  const { state } = useStates();
  const { documentType } = useDocumentType();

  useEffect(() => {
    if (state.length > 0) {
      setValue("stateId", state[0].id);
    }
  }, [state, setValue]);

  return (
    <>
      <PeopleCreateModal
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleCreatePerson}
        documentNumber={documentNumber}
        isLoading={isCreating}
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
          <div className="flex gap-4">
            <div className="w-1/3">
              <Select
                label="Tipo de documento"
                labelPlacement="outside"
                className="w-full"
                selectedKeys={[documentId.toString()]}
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0];
                  setDocumentId(selected ? Number(selected) : DNI_ID);
                }}
                isDisabled={isSearching}
              >
                {documentType.map((data) => (
                  <SelectItem key={data.id.toString()} value={data.id.toString()}>
                    {data.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div className="w-2/3">
              <CustomInput
                control={control}
                error={errors.personDNI}
                name="personDNI"
                type="text"
                label="DNI"
                placeholder="Ingrese DNI"
                onInput={allowOnlyNumbers}
                onChange={(e) => {
                  const value = e.target.value;
                  setDocumentNumber(value);
                  setValue("personDNI", value);
                }}
              />
            </div>
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
                    onSelectionChange={(item) => {
                      onChange(item);
                      setValue("hospitalId", parseInt(item as string));
                    }}
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
              value={watch("personalInfo.name")}
              labelPlacement="outside"
              placeholder="Nombre"
              disabled
            />
            <Input
              type="text"
              label="Apellidos"
              value={watch("personalInfo.surnames")}
              labelPlacement="outside"
              placeholder="Apellidos"
              disabled
            />
            <Input
              type="phone"
              label="Teléfono"
              value={watch("personalInfo.phone")}
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
              error={errors.stateId}
              isRequired
            />
            <CustomInput
              name="password"
              type="password"
              control={control}
              label="Contraseña"
              placeholder="Ingrese la contraseña"
              isRequired
              error={errors.password}
            />
            <CustomInput
              name="passwordConfirmation"
              type="password"
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
