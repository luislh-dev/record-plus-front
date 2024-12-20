import { CustomInput } from "@/components/CustomInput";
import { CustomSelect } from "@/components/CustomSelect";
import { Typography } from "@/components/Typography";
import { useDocumentType } from "@/hooks/documenttype/useDocumentType";
import { useGender } from "@/hooks/gender/useGender";
import { getPeruDateTime, parsePeruDate } from "@/utils/peruDateTime";
import { zodResolver } from "@hookform/resolvers/zod";
import { parseDate } from "@internationalized/date";
import {
  Alert,
  Button,
  DatePicker,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  peopleCreateRequiredSchema,
  PeopleCreateRequiredValues,
} from "../models/peopleCreateRequiredSchema";
import { MinimalPeopleResponseDto } from "../types/MinimalPeopleResponseDto";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: PeopleCreateRequiredValues) => void;
  documentNumber: string;
  personData: MinimalPeopleResponseDto;
  isLoading?: boolean;
}

export const PeopleCreateModal = ({
  isOpen,
  onClose,
  onConfirm,
  documentNumber,
  personData,
  isLoading = false,
}: Props) => {
  const { documentType } = useDocumentType();
  const { gender } = useGender();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PeopleCreateRequiredValues>({
    resolver: zodResolver(peopleCreateRequiredSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (personData) {
      setValue("name", personData.name);
      setValue("paternalSurname", personData.fatherLastName);
      setValue("maternalSurname", personData.motherLastName);
      setValue("typeDocumentId", 1);
      setValue("documentNumber", documentNumber);
      setValue("birthdate", new Date(getPeruDateTime()));
    }
  }, [personData, documentNumber, setValue]);

  const dataSource = personData.dataSource?.toUpperCase() || "RENIEC";

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isDismissable={false}
        size="2xl"
        aria-label="Modal de creación de persona"
      >
        <ModalContent aria-label="Contenido del modal de creación de persona">
          <>
            <form onSubmit={handleSubmit(onConfirm)}>
              <ModalHeader className="flex flex-col" aria-label="Cabezera de la modal de creación">
                <Typography as="h3" variant="subsection">
                  Confirmar datos de {dataSource}
                </Typography>
                <Typography variant="body" color="muted">
                  Se encontraron los siguientes datos en {dataSource}. Por favor confirme que son
                  correctos.
                </Typography>
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Typography variant="data-title" color="muted">
                      Nombres
                    </Typography>
                    <Typography variant="body-small" className="font-medium">
                      {personData.name}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="data-title" color="muted">
                      Apellidos
                    </Typography>
                    <Typography variant="body-small" className="font-medium">
                      {personData.fatherLastName} {personData.motherLastName}
                    </Typography>
                  </div>
                </div>
                <Alert
                  variant="bordered"
                  description="Utiliza los datos recuperados para completar el formulario y registrar a la persona en el sistema de manera precisa."
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CustomSelect
                    variant="bordered"
                    name="typeDocumentId"
                    control={control}
                    options={documentType}
                    label="Tipo de documento"
                    isRequired
                  />
                  <CustomInput
                    name="documentNumber"
                    variant="bordered"
                    control={control}
                    type="text"
                    label="Número de documento"
                    isRequired
                    error={errors.documentNumber}
                    placeholder="Ingese el número de documento"
                  />
                  <Controller
                    control={control}
                    name="birthdate"
                    render={({ field: { onChange, value } }) => {
                      const today = getPeruDateTime();
                      const formattedDate = value instanceof Date ? value : today;
                      const selectedDate = parseDate(parsePeruDate(formattedDate));

                      return (
                        <div className="flex flex-col gap-1">
                          <DatePicker
                            isInvalid={!!errors.birthdate}
                            label="Fecha de nacimiento"
                            variant="bordered"
                            labelPlacement="outside"
                            isRequired
                            value={selectedDate}
                            onChange={(date) => {
                              if (date) {
                                const newDate = new Date(date.toString());
                                onChange(newDate);
                              }
                            }}
                          />
                          <Typography variant="error" className="h-4 pl-1">
                            {errors.birthdate?.message}
                          </Typography>
                        </div>
                      );
                    }}
                  />

                  <CustomSelect
                    variant="bordered"
                    control={control}
                    name="sexTypeId"
                    label="Genero"
                    options={gender}
                    placeholder="Seleccione un genero"
                  />
                  <CustomInput
                    name="phone"
                    variant="bordered"
                    control={control}
                    type="text"
                    label="Teléfono"
                    error={errors.phone}
                    placeholder="Ingrese el teléfono"
                    isRequired
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button type="button" color="danger" variant="flat" onPress={onClose}>
                  Cancelar
                </Button>
                <Button type="submit" color="primary" isLoading={isLoading}>
                  Confirmar
                </Button>
              </ModalFooter>
            </form>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};
