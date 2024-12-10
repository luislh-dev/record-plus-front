import { GenericTable } from "@/components/GenericTable";
import { ModalConfirmDelete } from "@/components/ModalConfirmDelete";
import { statusColorMap } from "@/constants/statusColorMap";
import { useHospital } from "@/pages/hospital/hooks/useHospital";
import { Add } from "@/icons/Add";
import { Button, Chip } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { HospitalListDTO } from "./types/HospitalListDTO";
import { HospitalTableColumn } from "./types/hospital";
import { ActionsCell } from "./components/ActionCells";
import { DropDownFilter } from "./components/DropDrownFilter";
import { DropDownSort } from "./components/DropDownSort";
import { SearchParamsDropdown } from "./components/DropDownSearchParams";
import { Align } from "@/constants/align";
import { useSearchStore } from "./stores/searchStore";
import { SearchImput } from "./components/Search";

const Hospital = () => {
  const navigate = useNavigate();

  const { setPage, sortConfig, setSortConfig } = useSearchStore();

  // Obtener toda la funcionalidad del hook
  const {
    hospitals,
    isLoading,
    error,
    pagination,
    deleteState: { isDeleting },
    isOpen,
    openDeleteModal,
    closeDeleteModal,
    handleDelete,
  } = useHospital();

  // Definición de columnas para la tabla
  const columns: HospitalTableColumn[] = [
    {
      name: "Nombre",
      uuid: "name",
      sortable: true,
    },
    {
      name: "Teléfono",
      uuid: "phone",
      sortable: true,
    },
    {
      name: "Correo electrónico",
      uuid: "email",
      sortable: true,
    },
    {
      name: "RUC",
      uuid: "ruc",
      sortable: true,
    },
    {
      name: "Estado",
      uuid: "state",
      align: Align.CENTER,
      render: (hospital: HospitalListDTO) => (
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
      align: Align.CENTER,
      render: (hospital: HospitalListDTO) => (
        <ActionsCell
          hospital={hospital}
          onEdit={() => navigate(`/hospitals/${hospital.id}/edit`)}
          onDelete={() => openDeleteModal(hospital.id)}
        />
      ),
    },
  ];

  return (
    <>
      <div>
        {/* Encabezado */}
        <Header onAddHospital={() => navigate("/hospitals/add")} />

        {/* Barra de búsqueda y filtros */}
        <search className="px-2 pb-2 pt-4 flex gap-x-4">
          <SearchImput />
          <SearchParamsDropdown />
          <DropDownFilter />
          <DropDownSort />
        </search>
        {/* Tabla de hospitales */}
        <GenericTable
          columns={columns}
          data={hospitals}
          error={error?.message}
          emptyMessage="No se encontraron hospitales."
          isLoading={isLoading}
          loadingContent="Cargando hospitales..."
          totalPages={pagination.totalPages}
          currentPage={pagination.currentPage}
          onPageChange={setPage}
          onSort={(field) =>
            setSortConfig({ field, direction: sortConfig.direction })
          }
          sortConfig={sortConfig}
        />
      </div>

      {/* Modal de confirmación para eliminar */}
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
};

// Componentes auxiliares para mejorar la legibilidad

interface HeaderProps {
  onAddHospital: () => void;
}

function Header({ onAddHospital }: HeaderProps) {
  return (
    <div className="flex max-w-full justify-between px-3">
      <h1 className="text-2xl font-bold">Lista de Hospitales</h1>
      <Button
        color="primary"
        onClick={onAddHospital}
        endContent={<Add size={18} />}
      >
        Agregar Hospital
      </Button>
    </div>
  );
}

export default Hospital;
