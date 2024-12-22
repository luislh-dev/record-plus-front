import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from '@nextui-org/react';

interface ModalConfirmDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  title?: string;
  message?: string;
  isLoading?: boolean;
}

export function ModalConfirmDelete({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirmar eliminación',
  message = '¿Está seguro que desea eliminar este elemento?',
  isLoading = false
}: ModalConfirmDeleteProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      backdrop="blur"
      classNames={{
        backdrop: 'backdrop-opacity-20'
      }}
    >
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>
              <p>{message}</p>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose} disabled={isLoading}>
                Cancelar
              </Button>
              <Button
                color="danger"
                onPress={async () => {
                  await onConfirm();
                  onClose();
                }}
                isLoading={isLoading}
              >
                Eliminar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
