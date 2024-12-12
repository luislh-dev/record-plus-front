import { GenericTable } from "@/components/GenericTable";
import { HospitalListDTO } from "../types/HospitalListDTO";
import { Align } from "@/constants/align";
import { statusColorMap } from "@/constants/statusColorMap";
import { Chip } from "@nextui-org/react";
import { ActionsCell } from "./ActionCells";
import { useNavigate } from "react-router-dom";
import { useHospital } from "../hooks/useHospital";
import { useSearchStore } from "../stores/searchStore";
import { useHandleSort } from "@/hooks/useHandleSort";
import { TableColumn } from "@/types/TableColumn";

export const HospitalList = () => {
  const navigate = useNavigate();

  const { setPage, sortConfig, setSortConfig } = useSearchStore();
  const { getNewSortConfig } = useHandleSort(sortConfig);
  const { hospitals, isLoading, error, pagination, openDeleteModal } =
    useHospital();

  const columns: TableColumn<HospitalListDTO>[] = [
    {
      name: "Nombre",
      key: "name",
      sortable: true,
    },
    {
      name: "Teléfono",
      key: "phone",
      sortable: true,
    },
    {
      name: "Correo electrónico",
      key: "email",
      sortable: true,
    },
    {
      name: "RUC",
      key: "ruc",
      sortable: true,
    },
    {
      name: "Estado",
      key: "state",
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
      key: "actions",
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

  const handleSort = (field: keyof HospitalListDTO) => {
    setSortConfig(getNewSortConfig(field));
  };

  return (
    <>
      {/* TODO: falta corregir el sort change */}
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
        onSort={(field) => handleSort(field as keyof HospitalListDTO)}
        sortConfig={sortConfig}
      />
    </>
  );
};
