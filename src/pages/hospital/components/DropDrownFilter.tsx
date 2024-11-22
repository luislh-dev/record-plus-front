import { useStates } from "@/hooks/state/useState";
import { Tune } from "@/icons/Tune";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Radio,
  RadioGroup,
} from "@nextui-org/react";

interface DropDownFilterProps {
  onStateChange: (stateId: string | number) => void;
  selectedState: string;
}

export function DropDownFilter({
  onStateChange,
  selectedState = "todos",
}: DropDownFilterProps) {
  const { state } = useStates();

  const handleValueChange = (selectedValue: string) => {
    if (selectedValue === "todos") {
      onStateChange("");
      return;
    }

    // Find the state object by name and pass its ID
    const selectedStateObj = state.find((s) => s.name === selectedValue);
    if (selectedStateObj) {
      onStateChange(selectedStateObj.id);
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="bordered"
          aria-label="Filtrar por estados"
          startContent={<Tune />}
          aria-expanded="false"
          aria-haspopup="listbox"
        >
          Filtrar
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        variant="faded"
        aria-label="Lista de estados para filtrar"
        closeOnSelect={false}
      >
        <DropdownSection
          title="Estados"
          aria-label="Sección de estados"
          showDivider
        >
          <DropdownItem textValue="Estados">
            <RadioGroup
              aria-label="Seleccionar estado"
              value={selectedState}
              onValueChange={handleValueChange}
            >
              <Radio
                key="todos"
                value="todos"
                aria-label="Mostrar todos los estados"
              >
                Todos
              </Radio>
              {state?.map((item) => (
                <Radio key={item.id} value={item.name} aria-label={item.name}>
                  {item.name}
                </Radio>
              ))}
            </RadioGroup>
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
