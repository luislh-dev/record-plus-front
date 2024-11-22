import { useForm } from "react-hook-form";
import {
  HospitalCreateValues,
  hospitalCreateSchema,
} from "../models/hospitalCreateSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomInput } from "@/components/CustomInput";
import { Button } from "@nextui-org/react";
import { CustomSelect } from "@/components/CustomSelect";
import { useStates } from "@/hooks/state/useState";
import { useEffect } from "react";

interface Props {
  onSubmit: (data: HospitalCreateValues) => void;
  isSubmitting?: boolean;
  defaultValues?: HospitalCreateValues;
}

export const HospitalForm = ({
  onSubmit,
  isSubmitting,
  defaultValues,
}: Props) => {
  const state = useStates().state;

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<HospitalCreateValues>({
    resolver: zodResolver(hospitalCreateSchema),
    mode: "onChange",
    defaultValues: defaultValues || {
      name: "",
      address: "",
      phone: "",
      email: "",
      ruc: "",
    },
  });

  useEffect(() => {
    if (state.length > 0) {
      setValue("stateId", state[0].id);
    }
  }, [state, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
      <CustomInput
        name="name"
        control={control}
        label="Nombre del hospital"
        placeholder="Ingrese el nombre"
        error={errors.name}
        isRequired
      />
      <CustomInput
        name="address"
        control={control}
        label="Dirección"
        placeholder="Ingrese la dirección"
        error={errors.address}
        isRequired
      />
      <CustomInput
        name="phone"
        control={control}
        label="Teléfono"
        placeholder="Ingrese el teléfono"
        error={errors.phone}
        isRequired
      />
      <CustomInput
        name="email"
        control={control}
        label="Correo electrónico"
        placeholder="Ingrese el correo"
        error={errors.email}
        isRequired
      />
      <CustomInput
        name="ruc"
        control={control}
        label="RUC"
        placeholder="Ingrese el RUC"
        error={errors.ruc}
        isRequired
      />
      <CustomSelect
        name="stateId"
        control={control}
        label="Estado"
        options={state}
        error={errors.stateId}
      />
      <div className="col-span-2 flex justify-end gap-2">
        <Button type="submit" color="primary" isLoading={isSubmitting}>
          Guardar
        </Button>
      </div>
    </form>
  );
};
