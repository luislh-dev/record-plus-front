import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { HospitalForm } from "./components/HospitalForm";
import { useHospitalCreate } from "./hooks/useHospitalCreate";
import { HospitalCreateValues } from "./models/hospitalCreateSchema";

const HospitalAdd = () => {
  const navigate = useNavigate();

  const {
    handleCreate,
    createState: { isLoading, error },
  } = useHospitalCreate();

  const onSubmit = async (data: HospitalCreateValues) => {
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

      <HospitalForm
        onSubmit={onSubmit}
        isSubmitting={isLoading}
        apiErrors={error}
      />
    </div>
  );
};

export default HospitalAdd;
