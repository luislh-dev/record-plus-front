import { useDocumentType } from '@/hooks/documenttype/useDocumentType';
import { Select, SelectItem } from '@heroui/react';

export interface DocumentTypeSelectProps {
  onChange: (documentType: number) => void;
  value: string;
  isDisabled?: boolean;
}

export const DocumentTypeSelect = ({ onChange, value, isDisabled }: DocumentTypeSelectProps) => {
  const { documentType, isLoading } = useDocumentType();
  return (
    <Select
      label='Tipo de documento'
      variant='bordered'
      labelPlacement='outside'
      isRequired
      className='w-full'
      selectedKeys={[value]}
      isLoading={isLoading}
      disabled={isDisabled}
      onSelectionChange={(keys) => {
        const selected = Array.from(keys)[0];
        onChange(Number(selected));
      }}
    >
      {documentType.map((type) => (
        <SelectItem key={type.id} value={type.id}>
          {type.name}
        </SelectItem>
      ))}
    </Select>
  );
};
