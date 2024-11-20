import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import { useStates } from "@/hooks/state/useState";
import { useHospital } from "@/hooks/useHospital";
import { HospitalCreateRequest } from "@/types/DTO/hospital/HospitalCreateRequest";

export function HospitalEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useStates();

  const {
    getById,
    getByIdState: {
      isLoading: isLoadingHospital,
      data: hospital,
      error: getError,
    },
    handleUpdate,
    updateState: { isUpdating, error: updateError },
  } = useHospital();

  const [stateValue, setStateValue] = useState<string>("");

  useEffect(() => {
    if (id) {
      getById(parseInt(id));
    }
  }, [id, getById]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) return;

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
      await handleUpdate(parseInt(id), data);
      navigate(-1);
    } catch (error) {
      console.error("Error updating hospital:", error);
    }
  };

  if (isLoadingHospital) {
    return <div>Cargando...</div>;
  }

  if (getError) {
    return <div>Error: {getError}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Editar Hospital</h1>
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
          defaultValue={hospital?.name}
          isRequired
        />

        <Input
          type="text"
          name="ruc"
          label="RUC"
          placeholder="Ingrese el RUC"
          defaultValue={hospital?.ruc}
          isRequired
        />

        <Input
          type="email"
          name="email"
          label="Correo electrónico"
          placeholder="Ingrese el correo"
          defaultValue={hospital?.email}
          isRequired
        />

        <Input
          type="tel"
          name="phone"
          label="Teléfono"
          placeholder="Ingrese el teléfono"
          defaultValue={hospital?.phone}
          isRequired
        />

        <Input
          type="text"
          name="address"
          label="Dirección"
          placeholder="Ingrese la dirección"
          defaultValue={hospital?.address}
          isRequired
        />

        <Select
          label="Estados"
          selectedKeys={[hospital?.stateId.toString() || ""]}
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
          <Button type="submit" color="primary" isLoading={isUpdating}>
            Actualizar
          </Button>
        </div>
      </Form>

      {updateError && <div className="text-danger">{updateError}</div>}
    </div>
  );
}
