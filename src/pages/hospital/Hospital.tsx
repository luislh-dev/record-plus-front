import { GenericTable } from "@/components/GenericTable";
import { ModalConfirmDelete } from "@/components/ModalConfirmDelete";
import { statusColorMap } from "@/constants/statusColorMap";
import { useHospital } from "@/pages/hospital/hooks/useHospital";
import { Add } from "@/icons/Add";
import { Button, Chip, Input } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { HospitalListDTO } from "./types/HospitalListDTO";
import { HospitalTableColumn } from "./types/hospital";
import { ActionsCell } from "./components/ActionCells";
import { DropDownFilter } from "./components/DropDrownFilter";
import { DropDownSort } from "./components/DropDownSort";
import { Search } from "@/icons/Search";
import { SearchParamsDropdown } from "./components/DropDownSearchParams";
import { SEARCH_PARAMS } from "./constants/searchParams";

export function Hospital() {
  const navigate = useNavigate();

  // Obtener toda la funcionalidad del hook
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
    selectedState,
    handleStateChange,
    handleSearchParamsChange,
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
    },
    {
      name: "Correo electrónico",
      uuid: "email",
    },
    {
      name: "RUC",
      uuid: "ruc",
    },
    {
      name: "Estado",
      uuid: "state",
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
      align: "center",
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
            startContent={<Search />}
          />
          <SearchParamsDropdown
            params={SEARCH_PARAMS}
            onParamsChange={handleSearchParamsChange}
          />
          <DropDownFilter
            onStateChange={handleStateChange}
            selectedState={selectedState}
          />
          <DropDownSort onSortSelected={handleSort} selectedSort={sortConfig} />
        </search>
        {/* Tabla de hospitales */}
        <GenericTable
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
}

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
