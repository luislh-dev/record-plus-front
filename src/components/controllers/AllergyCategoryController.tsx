import type { InputVariant } from '@/types/InputVariant';
import { type Control, Controller, type FieldError, type FieldValues, type Path } from 'react-hook-form';
import { AllergyCategorySelect } from '../AllergyCategorySelect';

interface AllergyCategoryControllerProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  variant?: InputVariant;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  error?: FieldError;
}

export function AllergyCategoryController<T extends FieldValues>({
  name,
  control,
  label = 'Categoría de alergia',
  placeholder = 'Selecciona una categoría',
  isRequired = false,
  isDisabled = false,
  variant = 'bordered',
  size = 'md',
  className,
  error,
}: Readonly<AllergyCategoryControllerProps<T>>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <div className='flex flex-col'>
          <AllergyCategorySelect
            value={value}
            onSelectionChange={onChange}
            label={label}
            placeholder={placeholder}
            isRequired={isRequired}
            isDisabled={isDisabled}
            isInvalid={!!error}
            variant={variant}
            size={size}
            className={className}
          />
          <p className='h-4 text-xs text-danger pl-1'>{error?.message}</p>
        </div>
      )}
    />
  );
}
