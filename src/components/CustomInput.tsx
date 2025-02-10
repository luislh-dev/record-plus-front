import { InputVariant } from '@/types/InputVariant';
import { Input } from "@heroui/react";
import { Control, Controller, FieldError, FieldValues, Path } from 'react-hook-form';

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  isRequired?: boolean;
  placeholder?: string;
  type?: string;
  error?: FieldError;
  variant?: InputVariant;
  onInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CustomInput = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  isRequired,
  type,
  error,
  variant = 'bordered',
  onInput
}: Props<T>) => {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="flex flex-col gap-1">
            <Input
              {...field}
              onInput={onInput}
              value={field.value ?? ''}
              variant={variant}
              type={type}
              label={label}
              labelPlacement="outside"
              placeholder={placeholder}
              isInvalid={!!error}
              isRequired={isRequired}
            />
            <p className="h-4 text-xs text-danger pl-1">{error?.message}</p>
          </div>
        )}
      />
    </div>
  );
};
