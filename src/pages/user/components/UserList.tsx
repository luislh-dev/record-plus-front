import { useNavigate } from "react-router-dom";
import { useUserSearchStore } from "../stores/searchStore";
import { useHandleSortGeneric } from "@/hooks/useHandleSort";
import { TableColumn } from "@/types/TableColumn";
import { UserListDTO } from "../types/UserListDTO";
import { Align } from "@/constants/align";
import { Chip } from "@nextui-org/react";
import { statusColorMap } from "@/constants/statusColorMap";
import { GenericTable } from "@/components/GenericTable";
import { useUserSearch } from "../hooks/useUserSearch";

export const UserList = () => {
  const navigate = useNavigate();

  const { setPage, sortConfig, setSortConfig } = useUserSearchStore();
  const { getNewSortConfig } = useHandleSortGeneric(sortConfig);
  const { users, isLoading, error, pagination } = useUserSearch();

  const columns: TableColumn<UserListDTO>[] = [
    {
      name: "Nombre",
      key: "username",
      sortable: true,
    },
    {
      name: "Correo electrónico",
      key: "email",
      sortable: true,
    },
    {
      name: "DNI",
      key: "dni",
      sortable: true,
    },
    {
      name: "Hospital",
      key: "hospital",
      sortable: true,
    },
    {
      name: "Roles",
      key: "roles",
    },
    {
      name: "Estado",
      key: "state",
      align: Align.CENTER,
      render: (hospital: UserListDTO) => (
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
  ];

  return (
    <GenericTable
      columns={columns}
      data={users}
      isLoading={isLoading}
      error={error?.message}
      emptyMessage="No se encontraron usuarios"
      loadingContent="Cargando usuarios..."
      totalPages={pagination.totalPages}
      currentPage={pagination.currentPage}
      onPageChange={setPage}
      onSort={(field) =>
        setSortConfig(getNewSortConfig(field as keyof UserListDTO))
      }
      sortConfig={sortConfig}
    />
  );
};
