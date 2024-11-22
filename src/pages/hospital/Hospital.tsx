import { GenericTable } from "@/components/GenericTable";
import { ModalConfirmDelete } from "@/components/ModalConfirmDelete";
import { State } from "@/constants/state";
import { statusColorMap } from "@/constants/statusColorMap";
import { useHospital } from "@/pages/hospital/hooks/useHospital";
import { Add } from "@/icons/Add";
import { DeleteIcon } from "@/icons/DeleteIcon";
import { EditIcon } from "@/icons/EditIcon";
import { EyeIcon } from "@/icons/EyeIcon";
import { HospitalListDTO } from "@/pages/hospital/types/HospitalListDTO";
import { Button, Chip, Input, Tooltip } from "@nextui-org/react";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

export function Hospital() {
  const navigate = useNavigate();
  const {
    data: hospitals,
    isLoading,
    error,
    searchTerm,
    handleSearch,
    pagination,
    setPage,
    sortConfig,
    handleSort,
    deleteState: { isDeleting },
    isOpen,
    openDeleteModal,
    closeDeleteModal,
    handleDelete,
  } = useHospital();

  const columns: Array<{
    name: string;
    uuid: keyof Hospital | "actions";
    align?: "start" | "center" | "end";
    render?: (hospital: Hospital) => ReactNode;
    sortable?: boolean;
  }> = [
    { name: "Nombre", uuid: "name", sortable: true },
    { name: "Teléfono", uuid: "phone" },
    { name: "Correo electrónico", uuid: "email" },
    { name: "RUC", uuid: "ruc" },
    {
      name: "Estado",
      uuid: "state",
      render: (hospital: Hospital) => (
        <Chip
          className="capitalize"
          color={statusColorMap[hospital.state] || "default"}
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
              onClick={() => navigate(`/hospitals/${hospital.id}/edit`)}
            >
              <EditIcon />
            </span>
          </Tooltip>
          <Tooltip content="Eliminar hospital">
            <span
              className={`text-lg transition-all duration-200 ${
                hospital.state.includes(State.INACTIVO)
                  ? "text-danger/40 pointer-events-none cursor-not-allowed opacity-70"
                  : "text-danger cursor-pointer active:opacity-50 hover:opacity-80"
              }`}
              onClick={() => {
                if (!hospital.state.includes(State.INACTIVO)) {
                  openDeleteModal(hospital.id);
                }
              }}
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
      <div>
        <div className="flex max-w-full justify-between px-3">
          <h1 className="text-2xl font-bold">Lista de Hospitales</h1>
          <Button
            color="primary"
            onClick={() => navigate("/hospitals/add")}
            endContent={<Add size={18} />}
          >
            Agregar Hospital
          </Button>
        </div>
        <search className="px-2 pb-2 pt-4">
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[15rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            onClear={() => handleSearch("")}
            type="text"
            placeholder="Buscar hospital..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </search>
        <GenericTable<HospitalListDTO>
          columns={columns}
          data={hospitals}
          error={error}
          emptyMessage="No se encontraron hospitales."
          isLoading={isLoading}
          loadingContent="Cargando hospitales..."
          totalPages={pagination.totalPages}
          currentPage={pagination.currentPage}
          onPageChange={setPage}
          onSort={handleSort}
          sortConfig={sortConfig}
        />
      </div>
      <ModalConfirmDelete
        isOpen={isOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Eliminar Hospital"
        message="¿Está seguro que desea eliminar este hospital? Esta acción no se puede deshacer."
      />
    </>
  );
}
