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
        render={({ field: { onChange, value } }) => {
          // Asegurarse de que value sea un string para el Set
          const selectedValue = value ? value.toString() : "";

          return (
            <Select
              label={label}
              selectedKeys={
                selectedValue ? new Set([selectedValue]) : new Set()
              }
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0];
                onChange(selected ? Number(selected) : null);
              }}
              defaultSelectedKeys={
                selectedValue ? new Set([selectedValue]) : new Set()
              }
              errorMessage={error?.message}
              isInvalid={!!error}
            >
              {options.map((option) => (
                <SelectItem
                  key={option.id.toString()}
                  value={option.id.toString()}
                >
                  {option.name}
                </SelectItem>
              ))}
            </Select>
          );
        }}
      />
    </div>
  );
};
