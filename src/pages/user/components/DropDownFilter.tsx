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
import { SEARCH_PARAMS } from "../constants/searchParams";
import { SearchFieldKeys } from "../types/UserRequestParams";

export function DropDownFilter() {
  const { state } = useStates();

  const {
    selectedState,
    setSelectedState,
    selectedSearchField,
    setSelectedSearchField,
  } = useUserSearchStore();

  const handleStateChange = (selectedValue: string) => {
    if (selectedValue === "all") {
      setSelectedState(null);
    } else {
      setSelectedState(parseInt(selectedValue));
    }
  };

  const handleSearchParamChange = (selectedValue: string) => {
    setSelectedSearchField(selectedValue as SearchFieldKeys);
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
        <DropdownSection title="Parámetro de busqueda" aria-label="Parámetros">
          <DropdownItem textValue="Parámetros">
            <RadioGroup
              aria-label="Seleccionar un parámetro de busqueda"
              value={selectedSearchField}
              onValueChange={handleSearchParamChange}
            >
              {SEARCH_PARAMS.map((param) => (
                <Radio
                  key={param.id}
                  value={param.id}
                  aria-label={`Seleccionar ${param.label} como parámetro de busqueda`}
                >
                  {param.label}
                </Radio>
              ))}
            </RadioGroup>
          </DropdownItem>
        </DropdownSection>
        <DropdownSection title="Estados" aria-label="Sección de estados">
          <DropdownItem textValue="Estados">
            <RadioGroup
              aria-label="Seleccionar un estado"
              value={selectedState?.toString() || "all"}
              onValueChange={handleStateChange}
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
