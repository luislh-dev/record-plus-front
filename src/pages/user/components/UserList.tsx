import { useUserSearchStore } from "../stores/searchStore";
import { useHandleSortGeneric } from "@/hooks/useHandleSort";
import { TableColumn } from "@/types/TableColumn";
import { UserListDTO } from "../types/UserListDTO";
import { Align } from "@/constants/align";
import { Chip } from "@nextui-org/react";
import { statusColorMap } from "@/constants/statusColorMap";
import { GenericTable } from "@/components/GenericTable";
import { useUserSearch } from "../hooks/useUserSearch";
import { ModalConfirmDelete } from "@/components/ModalConfirmDelete";
import { useUserDelete } from "../hooks/useUsersDeletes";
import { ActionsCell } from "@/components/ActionsCell";
import { State } from "@/constants/state";

export const UserList = () => {
  const { setPage, sortConfig, setSortConfig } = useUserSearchStore();
  const { getNewSortConfig } = useHandleSortGeneric(sortConfig);
  const { users, isLoading, error, pagination } = useUserSearch();
  const {
    handleDelete,
    openDeleteModal,
    closeDeleteModal,
    deleteState: { isLoading: isDeleting },
    isOpen,
  } = useUserDelete();

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
    {
      name: "Acciones",
      key: "actions",
      render: (user: UserListDTO) => (
        <ActionsCell
          state={user.state}
          onEdit={function (): void {
            throw new Error("Function not implemented.");
          }}
          onDelete={() => openDeleteModal(user.id)}
          inactiveStates={[State.INACTIVO, State.ELIMINADO]}
        />
      ),
    },
  ];

  return (
    <>
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
      <ModalConfirmDelete
        isOpen={isOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        title="Eliminar Usuario"
        message="¿Estás seguro de que deseas eliminar este usuario?"
      />
    </>
  );
};
