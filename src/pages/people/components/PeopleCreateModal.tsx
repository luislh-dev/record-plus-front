import { CustomInput } from '@/components/CustomInput';
import { CustomSelect } from '@/components/CustomSelect';
import { Typography } from '@/components/Typography';
import { CE_ID, DNI_ID, DNI_NAME } from '@/constants/documentType';
import { useGender } from '@/hooks/gender/useGender';
import { allowOnlyNumbers } from '@/utils/allowOnlyNumbers';
import { getPeruDateTime } from '@/utils/peruDateTime';
import { zodResolver } from '@hookform/resolvers/zod';
import { parseDate } from '@internationalized/date';
import {
  Alert,
  Button,
  DatePicker,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/react';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useCreateRequeridPerson } from '../hooks/useCreatePerson';
import {
  peopleCreateRequiredSchema,
  PeopleCreateRequiredValues
} from '../models/peopleCreateRequiredSchema';
import { MinimalPeopleResponseDto } from '../types/MinimalPeopleResponseDto';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: PeopleCreateRequiredValues) => void;
  personData: MinimalPeopleResponseDto;
}

export const PeopleCreateModal = ({ isOpen, onClose, onConfirm, personData }: Props) => {
  const { isCreating: isLoading, handleCreate, isSuccess } = useCreateRequeridPerson();
  const { gender } = useGender();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<PeopleCreateRequiredValues>({
    resolver: zodResolver(peopleCreateRequiredSchema),
    mode: 'onChange'
  });

  useEffect(() => {
    if (personData) {
      const documentID = personData.documentType === DNI_NAME ? DNI_ID : CE_ID;
      // Reseteamos con los nuevos valores
      reset({
        name: personData.name,
        paternalSurname: personData.fatherLastName,
        maternalSurname: personData.motherLastName,
        typeDocumentId: documentID,
        documentNumber: personData.documentNumber,
        birthdate: new Date(getPeruDateTime()),
        sexTypeId: undefined, // Resetear el género
        phone: '' // Resetear el teléfono
      });
    }
  }, [personData, reset]);

  const dataSource = personData.dataSource?.toUpperCase() || 'RENIEC';

  const onSubmit = async (data: PeopleCreateRequiredValues) => {
    await handleCreate(data);

    if (isSuccess) {
      onConfirm(data);
    }
  };

  const onCloseModal = () => {
    reset();
    onClose();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onCloseModal}
        isDismissable={false}
        size="2xl"
        aria-label="Modal de creación de persona"
      >
        <ModalContent aria-label="Contenido del modal de creación de persona">
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                  <div>
                    <Typography variant="data-title" color="muted">
                      Tipo de documento
                    </Typography>
                    <Typography variant="body-small" className="font-medium">
                      {personData.documentType}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="data-title" color="muted">
                      Número de documento
                    </Typography>
                    <Typography variant="body-small" className="font-medium">
                      {personData.documentNumber}
                    </Typography>
                  </div>
                </div>
                <Alert
                  variant="bordered"
                  description="Utiliza los datos recuperados para completar el formulario y registrar a la persona en el sistema de manera precisa."
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Controller
                    control={control}
                    name="birthdate"
                    render={({ field: { onChange, value } }) => {
                      const today = getPeruDateTime();
                      const formattedDate = value instanceof Date ? value : today;

                      // Asegurarse que la fecha esté en formato YYYY-MM-DD
                      const isoDate = formattedDate.toISOString().split('T')[0];
                      const selectedDate = parseDate(isoDate);

                      return (
                        <div className="flex flex-col gap-1">
                          <DatePicker
                            isInvalid={!!errors.birthdate}
                            label="Fecha de nacimiento"
                            variant="bordered"
                            labelPlacement="outside"
                            isRequired
                            value={selectedDate}
                            onChange={date => {
                              if (date) {
                                // Convertir la fecha seleccionada a Date
                                const [year, month, day] = date.toString().split('-');
                                const newDate = new Date(
                                  parseInt(year),
                                  parseInt(month) - 1, // Los meses en JavaScript son 0-indexed
                                  parseInt(day)
                                );
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
                    type="tel"
                    onInput={allowOnlyNumbers}
                    label="Teléfono"
                    error={errors.phone}
                    placeholder="Ingrese el teléfono"
                    isRequired
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button type="button" color="danger" variant="flat" onPress={onCloseModal}>
                  Cancelar
                </Button>

                <Button type="submit" color="primary" isLoading={isLoading} isDisabled={!isValid}>
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
