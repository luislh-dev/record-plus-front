import type { InputVariant } from '@/types/InputVariant';
import { DatePicker } from '@heroui/react';
import { type DateValue, getLocalTimeZone, now, today } from '@internationalized/date';
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
    render={({ field: { onChange } }) => {
      const handleChange = (date: DateValue | null) => {
        if (granularity === 'day') {
          // Para fechas de solo día, convertir a formato YYYY-MM-DD
          onChange(date?.toString() ?? null);
        } else {
          onChange(date?.toDate(getLocalTimeZone()).toISOString().slice(0, 19) ?? null);
        }
      };

      // Usar today() para fechas de solo día, now() para fechas con tiempo
      const defaultValue =
        granularity === 'day' ? today(getLocalTimeZone()) : now(getLocalTimeZone());

      return (
        <div className='flex flex-col gap-1'>
          <DatePicker
            hideTimeZone
            hourCycle={12}
            label={label}
            defaultValue={defaultValue}
            labelPlacement='outside'
            variant={variant}
            isRequired={isRequired}
            onChange={handleChange}
          />
          <p className='h-4 text-xs text-danger pl-1'>{error?.message}</p>
        </div>
      );
    }}
  />
);
