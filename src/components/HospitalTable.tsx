import React from "react";
import { Chip, Tooltip } from "@nextui-org/react";
import { statusColorMap } from "@/constants/statusColorMap";
import { EyeIcon } from "@/icons/EyeIcon";
import { EditIcon } from "@/icons/EditIcon";
import { DeleteIcon } from "@/icons/DeleteIcon";
import { useHospitalContext } from "@/contexts/hospital/hospitalContext";
import { ModalConfirmDelete } from "./ModalConfirmDelete";
import { useNavigate } from "react-router-dom";
import { GenericTable } from "./GenericTable";

export function HospitalTable() {
  const navigate = useNavigate();

  const {
    hospitals,
    error,
    setPage,
    currentPage,
    totalPages,
    isDeleting,
    isModalOpen,
    closeModal,
    handleDeleteClick,
    handleConfirmDelete,
  } = useHospitalContext();

  const handleEdit = React.useCallback(
    (id: number) => {
      navigate(`/hospital/${id}/edit`);
    },
    [navigate]
  );

  const columns: Array<{
    name: string;
    uuid: keyof Hospital | "actions";
    align?: "start" | "center" | "end";
    render?: (hospital: Hospital) => React.ReactNode;
  }> = [
    { name: "Nombre", uuid: "name" },
    { name: "Teléfono", uuid: "phone" },
    { name: "Correo electrónico", uuid: "email" },
    { name: "RUC", uuid: "ruc" },
    {
      name: "Estado",
      uuid: "state",
      render: (hospital: Hospital) => (
        <Chip
          className="capitalize"
          color={statusColorMap[hospital.state]}
          size="sm"
          variant="flat"
        >
          {hospital.state}
        </Chip>
      ),
    },
    {
      name: "Acciones",
      uuid: "actions",
      align: "center",
      render: (hospital: Hospital) => (
        <div className="relative flex items-center justify-center w-full gap-2">
          <Tooltip content="Ver detalles">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <EyeIcon />
            </span>
          </Tooltip>
          <Tooltip content="Editar hospital">
            <span
              className="text-lg text-default-400 cursor-pointer active:opacity-50"
              onClick={() => handleEdit(hospital.id)}
            >
              <EditIcon />
            </span>
          </Tooltip>
          <Tooltip content="Eliminar hospital">
            <span
              className={`text-lg text-danger cursor-pointer active:opacity-50 ${
                isDeleting ? "opacity-50" : ""
              }`}
              onClick={() => !isDeleting && handleDeleteClick(hospital.id)}
            >
              <DeleteIcon />
            </span>
          </Tooltip>
        </div>
      ),
    },
  ];
  type Hospital = (typeof hospitals)[0];

  return (
    <>
      <GenericTable
        columns={columns}
        data={hospitals}
        currentPage={currentPage}
        totalPages={totalPages}
        error={error}
        onPageChange={setPage}
      />
      <ModalConfirmDelete
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        title="Eliminar Hospital"
        message="¿Está seguro que desea eliminar este hospital? Esta acción no se puede deshacer."
      />
    </>
  );
}
