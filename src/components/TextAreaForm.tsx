import { InputVariant } from '@/types/InputVariant';
import { Textarea } from "@heroui/react";
import { Control, Controller, FieldError, FieldValues, Path } from 'react-hook-form';

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  isRequired?: boolean;
  placeholder?: string;
  error?: FieldError;
  variant?: InputVariant;
}

export const TextAreaForm = <T extends FieldValues>({
  name,
  control,
  label,
  isRequired = true,
  placeholder,
  error,
  variant = 'bordered'
}: Props<T>) => (
  <>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex flex-col gap-1">
          <Textarea
            label={label}
            labelPlacement="outside"
            placeholder={placeholder}
            variant={variant}
            isRequired={isRequired}
            {...field}
          />
          <p className="h-4 text-xs text-danger pl-1">{error?.message}</p>
        </div>
      )}
    />
  </>
);
