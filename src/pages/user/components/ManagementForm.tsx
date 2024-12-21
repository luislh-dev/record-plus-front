import { CustomInput } from "@/components/CustomInput";
import { CustomSelect } from "@/components/CustomSelect";
import { Typography } from "@/components/Typography";
import { DNI_ID } from "@/constants/documentType";
import { useDocumentType } from "@/hooks/documenttype/useDocumentType";
import { useStates } from "@/hooks/state/useState";
import { TaskAlt } from "@/icons/TaskAlt";
import { HospitalMinimalSearch } from "@/pages/hospital/components/HospitalMinimalSearch";
import { PeopleCreateModal } from "@/pages/people/components/PeopleCreateModal";
import { usePersonSearch } from "@/pages/people/hooks/usePersonSearch";
import { MinimalPeopleResponseDto } from "@/pages/people/types/MinimalPeopleResponseDto";
import { allowOnlyNumbers } from "@/utils/allowOnlyNumbers";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  Select,
  SelectItem,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUserManagementCreate } from "../hooks/useUserCreate";
import {
  userManagementCreateSchema,
  UserManagementCreateValues,
} from "../models/userManagementCreateSchema";
import { SearchHospitalTooltip } from "./SearchHospitalTooltip";

export const ManagementForm = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

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
          <CardBody className="flex flex-col">
            <form onSubmit={handleSubmit(handleCreate)} className="flex flex-col gap-4">
              {/* Sección para buscar a la persona a traves de su documento de identidad */}
              <div className="flex flex-col">
                <div className="flex gap-4 mb-1">
                  <div className="w-1/3">
                    <Select
                      label="Tipo de documento"
                      variant="bordered"
                      labelPlacement="outside"
                      isRequired
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
                  <SearchHospitalTooltip />
                </div>
                <HospitalMinimalSearch
                  onHospitalSelected={(hospitalId) => setValue("hospitalId", hospitalId)}
                />
                {errors.hospitalId && (
                  <Typography as="p" variant="error">
                    {errors.hospitalId.message}
                  </Typography>
                )}
              </div>

              <Divider className="my-2" />

              {/* Sección para la creación de usuario */}
              <div className="flex flex-col gap-4">
                <Typography as="h5" variant="body-small" className="font-medium">
                  Datos de acceso
                </Typography>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <CustomInput
                      name="email"
                      control={control}
                      label="Email"
                      error={errors.email}
                      placeholder="Ingrese el email"
                      isRequired
                    />
                  </div>

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
