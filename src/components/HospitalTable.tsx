import React from "react";
import { useHospitals } from "@/hooks/hospital/useHospital";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  getKeyValue,
} from "@nextui-org/react";
import { statusColorMap } from "@/constants/statusColorMap";
import { EyeIcon } from "@/icons/EyeIcon";
import { EditIcon } from "@/icons/EditIcon";
import { DeleteIcon } from "@/icons/DeleteIcon";

export function HospitalTable() {
  const renderCell = React.useCallback(
    (hospital: Hospital, columnKey: React.Key) => {
      const cellValue = hospital[columnKey as keyof Hospital];

      switch (columnKey) {
        case "state":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[hospital.state]}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center justify-center w-full gap-2">
              <Tooltip content="Ver detalles">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EyeIcon />
                </span>
              </Tooltip>
              <Tooltip content="Editar hospital">
                <span className="text-lg text-default-400  cursor-pointer active:opacity-50">
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip content="Eliminar hospital">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return getKeyValue(hospital, columnKey as string);
      }
    },
    []
  );

  const { hospitals, loading, error } = useHospitals();

  const columns = [
    { name: "Nombre", uuid: "name" },
    { name: "Teléfono", uuid: "phone" },
    { name: "Correo electrónico", uuid: "email" },
    { name: "RUC", uuid: "ruc" },
    { name: "Estado", uuid: "state" },
    { name: "Acciones", uuid: "actions" },
  ];

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  type Hospital = (typeof hospitals)[0];

  return (
    <Table>
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uuid}
            align={column.uuid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={hospitals}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
