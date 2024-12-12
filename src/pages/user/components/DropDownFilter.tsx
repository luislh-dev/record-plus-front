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
import { useUserSearchStore } from "../stores/searchStore";

export function DropDownFilter() {
  const { state } = useStates();

  const { selectedState, setSelectedState } = useUserSearchStore();

  const handleParamsChange = (selectedValue: string) => {
    if (selectedValue === "all") setSelectedState(null);

    if (selectedValue !== "all") setSelectedState(parseInt(selectedValue));
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
        aria-label="Lista para selecionar los filtros de la web"
        closeOnSelect={false}
      >
        <DropdownSection title="Estados" aria-label="Sección de estados">
          <DropdownItem textValue="Estados">
            <RadioGroup
              aria-label="Seleccionar un estado"
              value={selectedState?.toString() || "all"}
              onValueChange={handleParamsChange}
            >
              <Radio
                key="all"
                value="all"
                aria-label="Mostrar todos los estados."
              >
                Todos
              </Radio>
              {state.map((s) => (
                <Radio
                  key={s.id}
                  value={s.id.toString()}
                  aria-label={`Mostrar solo los estados de ${s.name}`}
                >
                  {s.name}
                </Radio>
              ))}
            </RadioGroup>
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
