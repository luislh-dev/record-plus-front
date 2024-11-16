import { Button, Input } from "@nextui-org/react";
import { Form, useNavigate } from "react-router-dom";

export function HospitalAdd() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Agregar Hospital</h1>
        <Button color="danger" variant="light" onClick={() => navigate(-1)}>
          Cancelar
        </Button>
      </div>

      <Form method="post" className="space-y-4">
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
        <div className="flex justify-end gap-2">
          <Button type="submit" color="primary">
            Guardar
          </Button>
        </div>
      </Form>
    </div>
  );
}
