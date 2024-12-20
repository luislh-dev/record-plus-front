import { CustomInput } from "@/components/CustomInput";
import { CustomSelect } from "@/components/CustomSelect";
import { Typography } from "@/components/Typography";
import { DNI_ID } from "@/constants/documentType";
import { useDocumentType } from "@/hooks/documenttype/useDocumentType";
import { useStates } from "@/hooks/state/useState";
import { Help } from "@/icons/Help";
import { TaskAlt } from "@/icons/TaskAlt";
import { useHospitalGetByName } from "@/pages/hospital/hooks/useHospitalGetBy";
import { PeopleCreateModal } from "@/pages/people/components/PeopleCreateModal";
import { usePersonSearch } from "@/pages/people/hooks/usePersonSearch";
import { MinimalPeopleResponseDto } from "@/pages/people/types/MinimalPeopleResponseDto";
import { allowOnlyNumbers } from "@/utils/allowOnlyNumbers";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  Select,
  SelectItem,
  Spinner,
  Tooltip,
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

export const ManagementForm = () => {
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
    mode: "onSubmit",
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
    success,
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
      <section>
        <Card className="flex flex-col gap-5 bg-[#F9FAFB]" shadow="md">
          <CardHeader>
            <header>
              <Typography as="h3" variant="section-title">
                Registro de usuario
              </Typography>
            </header>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <form onSubmit={handleSubmit(handleCreate)} className="flex flex-col gap-4">
              {/* Sección para buscar a la persona a traves de su documento de identidad */}
              <div className="flex flex-col">
                <div className="flex gap-4">
                  <div className="w-1/3">
                    <Select
                      label="Tipo de documento"
                      variant="bordered"
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
                    <div className="flex items-center gap-2 w-full">
                      <div className="flex-1">
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
                      {isSearching && <Spinner size="sm" />}
                      {success &&
                        documentNumber.length >= 8 &&
                        !isSearching &&
                        isOpen &&
                        !personData && <TaskAlt size={24} color="#4CAF50" />}
                    </div>
                  </div>
                </div>
                <Alert
                  color="warning"
                  variant="bordered"
                  title="Consejo"
                  description="Para registrar un nuevo usuario, primero ingrese el documento de identidad para cargar los datos personales. Luego complete la información de acceso al sistema"
                />
                <div className="flex flex-col mt-3">
                  <Typography as="h5" variant="body-small" className="font-medium">
                    Datos Encontrados
                  </Typography>
                  <div className="grid grid-cols-3 gap-4">
                    <Input
                      type="text"
                      label="Nombre"
                      value={watch("personalInfo.name") || ""}
                      isDisabled
                    />

                    <Input
                      type="text"
                      label="Apellidos"
                      value={watch("personalInfo.surnames") || ""}
                      isDisabled
                    />
                    <Input
                      type="phone"
                      label="Teléfono"
                      value={watch("personalInfo.phone") || ""}
                      isDisabled
                    />
                  </div>
                </div>
              </div>

              <Divider className="my-2" />

              {/* Sección para buscar el hospital, al cual se le asignara al nuevo usuario */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-x-2">
                  <Typography as="h5" variant="body-small" className="font-medium">
                    Buscar Hospital
                  </Typography>
                  <Tooltip
                    content={
                      <div className="max-w-xs">
                        <p>
                          Ingrese el nombre del hospital donde el usuario ejercerá sus funciones.
                        </p>
                        <ul className="list-disc pl-4 mt-2 text-sm">
                          <li>Escriba el nombre completo o parcial del hospital</li>
                          <li>Seleccione de la lista de resultados</li>
                          <li>
                            Asegúrese de elegir el hospital correcto si hay varios con nombres
                            similares
                          </li>
                        </ul>
                      </div>
                    }
                  >
                    <Help color="black" />
                  </Tooltip>
                </div>

                <Controller
                  name="hospitalId"
                  control={control}
                  render={({ field: { onChange } }) => {
                    return (
                      <Autocomplete
                        label="Hospital"
                        items={hospitals}
                        isLoading={isLoading}
                        scrollRef={scrollerRef}
                        onOpenChange={(isOpen) => {
                          if (isOpen) {
                            fetchNextPage();
                          }
                        }}
                        variant="bordered"
                        onInputChange={(value) => setSearchTerm(value)}
                        onSelectionChange={(item) => {
                          onChange(item);
                          setValue("hospitalId", parseInt(item as string));
                        }}
                      >
                        {(item) => <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>}
                      </Autocomplete>
                    );
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                <Button
                  type="submit"
                  color="primary"
                  isLoading={isSubmitting}
                  isDisabled={personData === null}
                >
                  Guardar
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </section>
    </>
  );
};
