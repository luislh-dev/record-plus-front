import { useStates } from "@/hooks/state/useState";
import { useHospital } from "@/pages/hospital/hooks/useHospital";
import { HospitalCreateRequest } from "@/pages/hospital/types/dto/HospitalCreateRequest";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";

export function HospitalAdd() {
  const navigate = useNavigate();

  // Recuperar los estados
  const state = useStates().state;
  const [stateValue, setStateValue] = useState<string>("");

  const {
    handleCreate,
    createState: { isCreating, error: createError },
  } = useHospital();

  useEffect(() => {
    if (state.length > 0 && !stateValue) {
      setStateValue(state[0].id.toString());
    }
  }, [state, stateValue]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data: HospitalCreateRequest = {
      name: formData.get("name") as string,
      ruc: formData.get("ruc") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      stateId: parseInt(stateValue),
    };

    try {
      await handleCreate(data);
      navigate("/hospitals");
    } catch (error) {
      console.error("Error creating hospital:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Agregar Hospital</h1>
        <Button color="danger" variant="light" onClick={() => navigate(-1)}>
          Cancelar
        </Button>
      </div>

      <Form
        method="post"
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4"
      >
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
          selectedKeys={stateValue ? [stateValue] : []}
          onSelectionChange={(keys) =>
            setStateValue(Array.from(keys)[0] as string)
          }
        >
          {state.map((item) => (
            <SelectItem key={item.id} value={item.id.toString()}>
              {item.name}
            </SelectItem>
          ))}
        </Select>

        <div className="col-span-2 flex justify-end gap-2">
          <Button type="submit" color="primary" isLoading={isCreating}>
            Guardar
          </Button>
        </div>
      </Form>
      {createError && <div className="text-danger">{createError}</div>}
    </div>
  );
}
