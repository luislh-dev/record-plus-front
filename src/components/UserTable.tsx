// components/UserTable.tsx
import React, { useEffect } from "react";
import { Chip, Tooltip } from "@nextui-org/react";
import { statusColorMap } from "@/constants/statusColorMap";
import { EditIcon } from "@/icons/EditIcon";
import { DeleteIcon } from "@/icons/DeleteIcon";
import { useUserContext } from "@/contexts/user/UserContext";
import { GenericTable } from "./GenericTable";
import { UserListDTO } from "@/types/DTO/user/UserDto";
import { useNavigate } from "react-router-dom";

export function UserTable() {
  const navigate = useNavigate();

  const {
    users,
    pagination: { currentPage, totalPages },
    fetchUsers,
  } = useUserContext();

  const handleEdit = React.useCallback(
    (id: string) => {
      navigate(`/user/${id}/edit`);
    },
    [navigate]
  );

  useEffect(() => {
    // Initial fetch with default pagination
    fetchUsers({ pageNumber: 0, pageSize: 20 });
  }, [fetchUsers]);

  const columns: Array<{
    name: string;
    uuid: keyof UserListDTO | "actions";
    align?: "start" | "center" | "end";
    render?: (user: UserListDTO) => React.ReactNode;
  }> = [
    { name: "Usuario", uuid: "username" },
    { name: "Email", uuid: "email" },
    { name: "DNI", uuid: "dni" },
    { name: "Hospital", uuid: "hospital" },
    {
      name: "Estado",
      uuid: "state",
      render: (user: UserListDTO) => (
        <Chip
          className="capitalize"
          color={statusColorMap[user.state as keyof typeof statusColorMap]}
          size="sm"
          variant="flat"
        >
          {user.state}
        </Chip>
      ),
    },
    {
      name: "Roles",
      uuid: "roles",
      render: (user: UserListDTO) => (
        <Chip size="sm" variant="flat">
          {user.roles}
        </Chip>
      ),
    },
    {
      name: "Acciones",
      uuid: "actions",
      align: "center",
      render: (user: UserListDTO) => (
        <div className="relative flex items-center justify-center w-full gap-2">
          <Tooltip content="Editar usuario">
            <span
              className="text-lg text-default-400 cursor-pointer active:opacity-50"
              onClick={() => handleEdit(user.id)}
            >
              <EditIcon />
            </span>
          </Tooltip>
          <Tooltip content="Eliminar usuario">
            <span
              className={`text-lg text-danger cursor-pointer active:opacity-50 `}
            >
              <DeleteIcon />
            </span>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <>
      <GenericTable
        columns={columns}
        data={users}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => fetchUsers({ pageNumber: page, pageSize: 20 })}
      />
    </>
  );
}
