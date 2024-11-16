import { useStates } from "@/hooks/state/useState";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import React, { useEffect } from "react";
import { Form, useNavigate } from "react-router-dom";

export function HospitalAdd() {
  const navigate = useNavigate();

  // Recuperar los estados
  const state = useStates().state;
  const [value, setValue] = React.useState<string>("");

  useEffect(() => {
    if (state.length > 0 && !value) {
      setValue(state[0].id.toString());
    }
  }, [state, value]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Agregar Hospital</h1>
        <Button color="danger" variant="light" onClick={() => navigate(-1)}>
          Cancelar
        </Button>
      </div>

      <Form method="post" className="grid grid-cols-2 gap-4">
        <Input
          type="text"
          name="name"
          label="Nombre del Hospital"
          placeholder="Ingrese el nombre"
          isRequired
        />

        <Input
          type="text"
          name="ruc"
          label="RUC"
          placeholder="Ingrese el RUC"
          isRequired
        />

        <Input
          type="email"
          name="email"
          label="Correo electrónico"
          placeholder="Ingrese el correo"
          isRequired
        />

        <Input
          type="tel"
          name="phone"
          label="Teléfono"
          placeholder="Ingrese el teléfono"
          isRequired
        />

        <Input
          type="text"
          name="address"
          label="Dirección"
          placeholder="Ingrese la dirección"
          isRequired
        />
        <Select
          label="Estados"
          selectedKeys={value ? [value] : []}
          onSelectionChange={(keys) => setValue(Array.from(keys)[0] as string)}
        >
          {state.map((item) => (
            <SelectItem key={item.id} value={item.id.toString()}>
              {item.name}
            </SelectItem>
          ))}
        </Select>

        <div className="col-span-2 flex justify-end gap-2">
          <Button type="submit" color="primary">
            Guardar
          </Button>
        </div>
      </Form>
    </div>
  );
}
