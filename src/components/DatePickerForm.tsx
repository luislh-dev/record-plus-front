import type { InputVariant } from '@/types/InputVariant';
import { DatePicker } from '@heroui/react';
import { type DateValue, getLocalTimeZone } from '@internationalized/date';
import {
  type Control,
  Controller,
  type FieldError,
  type FieldValues,
  type Path,
} from 'react-hook-form';

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  isRequired?: boolean;
  error?: FieldError;
  variant?: InputVariant;
  granularity?: 'day' | 'hour' | 'minute' | 'second';
}

export const DatePickerForm = <T extends FieldValues>({
  name,
  control,
  label,
  isRequired,
  error,
  variant = 'bordered',
  granularity = 'minute',
}: Props<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value } }) => {
      const handleChange = (date: DateValue | null) => {
        if (granularity === 'day') {
          // Para fechas de solo día, convertir a formato YYYY-MM-DD
          onChange(date?.toString() ?? null);
        } else {
          onChange(date?.toDate(getLocalTimeZone()).toISOString().slice(0, 19) ?? null);
        }
      };

      return (
        <div className='flex flex-col gap-1'>
          <DatePicker
            showMonthAndYearPickers
            label={label}
            defaultValue={value}
            labelPlacement='outside'
            variant={variant}
            isRequired={isRequired}
            onChange={handleChange}
            granularity={granularity}
          />
          <p className='h-4 text-xs text-danger pl-1'>{error?.message}</p>
        </div>
      );
    }}
  />
);
