import type { InputVariant } from '@/types/InputVariant';
import { DatePicker } from '@heroui/react';
import { type DateValue, getLocalTimeZone, parseDate, parseDateTime } from '@internationalized/date';
import { type Control, Controller, type FieldError, type FieldValues, type Path } from 'react-hook-form';

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
        if (!date) {
          onChange(null);
          return;
        }

        // Convertir DateValue a Date
        const convertedDate = date.toDate(getLocalTimeZone());
        onChange(convertedDate);
      };

      // Convertir Date a DateValue para el DatePicker
      const getDateValue = (dateValue: Date | string | null): DateValue | null => {
        if (!dateValue) return null;

        let date: Date;

        // Si es string, convertir a Date
        if (typeof dateValue === 'string') {
          date = new Date(dateValue);
          if (Number.isNaN(date.getTime())) return null;
        } else if (dateValue instanceof Date) {
          date = dateValue;
        } else {
          return null;
        }

        if (granularity === 'day') {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          return parseDate(`${year}-${month}-${day}`);
        }

        const isoString = date.toISOString();
        return parseDateTime(isoString.slice(0, 19));
      };

      return (
        <div className='flex flex-col gap-1'>
          <DatePicker
            showMonthAndYearPickers
            label={label}
            defaultValue={getDateValue(value)}
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
