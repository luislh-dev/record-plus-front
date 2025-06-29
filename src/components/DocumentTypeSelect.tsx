import type { DocumentTypeName } from '@/common/enum/DocumentType';
import { useDocumentType } from '@/hooks/documenttype/useDocumentType';
import { Select, SelectItem } from '@heroui/react';

interface DocumentTypeSelectProps {
  onChange: (documentType: DocumentTypeName) => void;
  value: DocumentTypeName;
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
      disallowEmptySelection
      className='w-full'
      selectedKeys={[value]}
      isLoading={isLoading}
      disabled={isDisabled}
      onSelectionChange={(keys) => {
        const selected = Array.from(keys)[0];
        onChange(selected as DocumentTypeName);
      }}
    >
      {documentType.map((type) => (
        <SelectItem key={type.name} textValue={type.name}>
          {type.name}
        </SelectItem>
      ))}
    </Select>
  );
};
