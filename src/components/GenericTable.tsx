import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination as TablePagination,
} from "@nextui-org/react";

interface Column<T> {
  name: string;
  uuid: keyof T | "actions";
  align?: "start" | "center" | "end";
  render?: (item: T) => React.ReactNode;
}

interface GenericTableProps<T> {
  columns: Column<T>[];
  data: T[];
  currentPage?: number;
  totalPages?: number;
  error?: string | null;
  onPageChange?: (page: number) => void;
  emptyMessage?: string;
  errorMessage?: string;
  showPagination?: boolean;
}

export function GenericTable<T extends { id: number | string }>({
  columns,
  data,
  currentPage = 0,
  totalPages = 0,
  error,
  onPageChange,
  emptyMessage = "No se encontraron resultados...",
  errorMessage = "Ha ocurrido un error inesperado. Por favor, inténtelo de nuevo más tarde.",
  showPagination = true,
}: GenericTableProps<T>) {
  const renderCell = (item: T, columnKey: keyof T | "actions") => {
    const column = columns.find((col) => col.uuid === columnKey);

    if (column?.render) {
      return column.render(item);
    }

    return item[columnKey as keyof T] as unknown as React.ReactNode;
  };

  return (
    <Table
      aria-label="Tabla genérica"
      bottomContent={
        !error &&
        data.length > 0 &&
        showPagination && (
          <div className="flex w-full justify-start">
            <TablePagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={currentPage + 1}
              total={totalPages}
              onChange={(page) => onPageChange?.(page - 1)}
            />
          </div>
        )
      }
    >
      <TableHeader>
        {columns.map((column) => (
          <TableColumn
            key={String(column.uuid)}
            align={column.align || "start"}
          >
            {column.name}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody
        items={error ? [] : data}
        emptyContent={error ? errorMessage : emptyMessage}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>
                {renderCell(item, columnKey as keyof T | "actions")}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
