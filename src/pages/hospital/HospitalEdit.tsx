import { Button } from "@nextui-org/react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useHospitalUpdate } from "./hooks/useHospitalUpdate";
import { useHospitalGetBy } from "./hooks/useHospitalGetBy";
import { HospitalForm } from "./components/HospitalForm";
import { HospitalCreateValues } from "./models/hospitalCreateSchema";

export function HospitalEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    getById,
    getByIdState: {
      isLoading: isLoadingHospital,
      data: hospital,
      error: getError,
    },
  } = useHospitalGetBy();

  const {
    handleUpdate,
    updateState: { isLoading: isUpdating, error: updateError },
  } = useHospitalUpdate();

  useEffect(() => {
    if (id) {
      getById(parseInt(id));
    }
  }, [id, getById]);

  const onSubmit = async (data: HospitalCreateValues) => {
    if (!id) return;
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

      <HospitalForm
        onSubmit={onSubmit}
        isSubmitting={isUpdating}
        defaultValues={{
          name: hospital?.name || "",
          address: hospital?.address || "",
          phone: hospital?.phone || "",
          email: hospital?.email || "",
          ruc: hospital?.ruc || "",
          stateId: hospital?.stateId || 0,
        }}
        apiErrors={updateError}
      />
    </div>
  );
}
