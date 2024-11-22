import { Select, SelectItem } from "@nextui-org/react";
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";

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
}

export const CustomSelect = <T extends FieldValues>({
  name,
  control,
  label,
  options,
  error,
}: Props<T>) => {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            label={label}
            selectedKeys={field.value ? [field.value.toString()] : []}
            onChange={(e) => field.onChange(Number(e.target.value))}
            errorMessage={error?.message}
            isInvalid={!!error}
          >
            {options.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.name}
              </SelectItem>
            ))}
          </Select>
        )}
      />
    </div>
  );
};
