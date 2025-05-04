import type { InputVariant } from '@/types/InputVariant';
import { Select, SelectItem } from '@heroui/react';
import {
  type Control,
  Controller,
  type FieldError,
  type FieldValues,
  type Path,
} from 'react-hook-form';

interface Option {
  id: number;
  name: string;
}

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  options: Option[];
  error?: FieldError;
  isRequired?: boolean;
  placeholder?: string;
  variant?: InputVariant;
}

export const CustomSelect = <T extends FieldValues>({
  name,
  control,
  label,
  options,
  error,
  isRequired = true,
  placeholder,
  variant = 'bordered',
}: Props<T>) => (
  <>
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        // si value es null, usa el primer elemento del array, si no, usa el valor de value
        const selectedValue = value ? [value.toString()] : [options[0].id.toString()];
        return (
          <div className='flex flex-col gap-1 w-full'>
            <Select
              variant={variant}
              label={label}
              selectedKeys={selectedValue}
              disallowEmptySelection
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0];
                onChange(selected ? Number(selected) : null);
              }}
              placeholder={placeholder}
              labelPlacement='outside'
              isRequired={isRequired}
              defaultSelectedKeys={selectedValue}
              errorMessage={error?.message}
              isInvalid={!!error}
            >
              {options?.map((option) => (
                <SelectItem key={option.id.toString()} textValue={option.name}>
                  {option.name}
                </SelectItem>
              ))}
            </Select>
            <p className='h-4 text-xs text-danger pl-1'>{error?.message}</p>
          </div>
        );
      }}
    />
  </>
);
