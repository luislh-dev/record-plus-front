import { AllergyCategory } from '@/common/enum/AllergyCategory';
import { Select, SelectItem } from '@heroui/react';

interface AllergyCategorySelectProps {
  value?: AllergyCategory;
  onSelectionChange?: (category: AllergyCategory | null) => void;
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  variant?: 'flat' | 'bordered' | 'faded' | 'underlined';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  errorMessage?: string;
}

export function AllergyCategorySelect({
  value,
  onSelectionChange,
  label = 'Categoría de alergia',
  placeholder = 'Selecciona una categoría',
  isRequired = false,
  isDisabled = false,
  isInvalid = false,
  variant = 'bordered',
  size = 'md',
  className,
  errorMessage,
}: AllergyCategorySelectProps) {
  const handleSelectionChange = (keys: 'all' | Set<React.Key>) => {
    if (keys === 'all') return;

    const selectedKey = Array.from(keys)[0] as string;
    const selectedCategory = selectedKey ? (selectedKey as AllergyCategory) : null;
    onSelectionChange?.(selectedCategory);
  };

  return (
    <Select
      label={label}
      placeholder={placeholder}
      selectedKeys={value ? [value] : []}
      onSelectionChange={handleSelectionChange}
      isRequired={isRequired}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      variant={variant}
      size={size}
      className={className}
      errorMessage={errorMessage}
      labelPlacement='outside'
      disallowEmptySelection
    >
      {Object.entries(AllergyCategory).map(([key, label]) => (
        <SelectItem key={key} textValue={label}>
          {label}
        </SelectItem>
      ))}
    </Select>
  );
}
