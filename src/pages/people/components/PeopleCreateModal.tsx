import { Modal, ModalBody, ModalContent } from '@heroui/react';
import { useState } from 'react';
import { useCreateRequeridPerson } from '../hooks/useCreatePerson';
import type { PeopleCreateRequiredValues } from '../models/peopleCreateRequiredSchema';
import type { MinimalPeopleResponseDto } from '../types/MinimalPeopleResponseDto';
import { PeopleCreateForm } from './PeopleCreateForm';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: PeopleCreateRequiredValues) => void;
  personData: MinimalPeopleResponseDto;
}

export const PeopleCreateModal = ({ isOpen, onClose, onConfirm, personData }: Props) => {
  const { isCreating: isLoading, handleCreate, isSuccess } = useCreateRequeridPerson();

  const [formKey, setFormKey] = useState(0);

  const onSubmit = async (data: PeopleCreateRequiredValues) => {
    await handleCreate(data);
    if (isSuccess) {
      onConfirm(data);
    }
  };

  const onCloseModal = () => {
    setFormKey((prev) => prev + 1);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCloseModal}
      isDismissable={false}
      size='2xl'
      aria-label='Modal de creación de persona'
    >
      <ModalContent aria-label='Contenido del modal de creación de persona'>
        <ModalBody>
          <PeopleCreateForm
            key={formKey}
            onSubmit={onSubmit}
            isLoading={isLoading}
            showReniecData={true}
            personData={personData}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
