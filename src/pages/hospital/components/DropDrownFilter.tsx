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
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useSearchStore } from "../stores/searchStore";
import { SEARCH_PARAMS } from "../constants/searchParams";

export function DropDownFilter() {
  const { state } = useStates();

  const { selectedState, setSelectedState, searchFields, setSearchFields } =
    useSearchStore();

  const handleValueChange = (selectedValue: string) => {
    // Si se selecciona "Todos", se pasa null
    if (selectedValue === "todos") {
      setSelectedState(null);
    }
    // Si se selecciona un estado, se pasa el ID
    else {
      setSelectedState(parseInt(selectedValue));
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
        <DropdownSection title="Parámetro de busqueda" aria-label="Parámetros">
          <DropdownItem textValue="Parámetros">
            <RadioGroup
              aria-label="Seleccionar parámetro de búsqueda"
              value={searchFields[0]}
              onValueChange={(value) => setSearchFields([value])}
            >
              {SEARCH_PARAMS.map((param) => (
                <Radio key={param.id} value={param.id} aria-label={param.label}>
                  {param.label}
                </Radio>
              ))}
            </RadioGroup>
          </DropdownItem>
        </DropdownSection>
        <DropdownSection title="Estados" aria-label="Sección de estados">
          <DropdownItem textValue="Estados">
            <RadioGroup
              aria-label="Seleccionar estado"
              value={selectedState?.toString() || "todos"}
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
                <Radio
                  key={item.id}
                  value={item.id.toString()}
                  aria-label={item.name}
                >
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
