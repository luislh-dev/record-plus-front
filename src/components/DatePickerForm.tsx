import type { InputVariant } from '@/types/InputVariant';
import { ZonedDateTime, getLocalTimeZone, now } from '@internationalized/date';
import { DatePicker } from "@heroui/react";
import {
  type Control,
  Controller,
  type FieldError,
  type FieldValues,
  type Path
} from 'react-hook-form';

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  isRequired?: boolean;
  error?: FieldError;
  variant?: InputVariant;
}

export const DatePickerForm = <T extends FieldValues>({
  name,
  control,
  label,
  isRequired,
  error,
  variant = 'bordered'
}: Props<T>) => (
  <>
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => {
        const handleChange = (date: ZonedDateTime | null) => {
          // Convertir de Zoned a Date y de Date a ISOString
          onChange(date?.toDate().toISOString().slice(0, 19) ?? null);
        };

        return (
          <div className="flex flex-col gap-1">
            <DatePicker
              hideTimeZone
              hourCycle={12}
              label={label}
              defaultValue={now(getLocalTimeZone())}
              labelPlacement="outside"
              variant={variant}
              isRequired={isRequired}
              onChange={handleChange}
            />
            <p className="h-4 text-xs text-danger pl-1">{error?.message}</p>
          </div>
        );
      }}
    />
  </>
);
