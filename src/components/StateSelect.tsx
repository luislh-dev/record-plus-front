import { useStates } from '@/hooks/state/useState';
import { Select, SelectItem } from "@heroui/react";

interface Props {
  onChange: (stateId: number) => void;
  value: string;
  isDisabled?: boolean;
}

export const StateSelect = ({ onChange, value, isDisabled }: Props) => {
  const { state, isLoading } = useStates();

  return (
    <Select
      label="Estado"
      variant="bordered"
      labelPlacement="outside"
      isRequired
      className="w-full"
      selectedKeys={[value]}
      isLoading={isLoading}
      disabled={isDisabled}
      onSelectionChange={keys => {
        const selected = Array.from(keys)[0];
        onChange(Number(selected));
      }}
    >
      {state.map(type => (
        <SelectItem key={type.id} value={type.id}>
          {type.name}
        </SelectItem>
      ))}
    </Select>
  );
};
