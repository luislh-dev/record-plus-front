import { Align } from "@/constants/align";
import { ArrowDown } from "@/icons/ArrowDown";
import { ArrowUp } from "@/icons/ArrowUp";
import { UnfoldMore } from "@/icons/UnfoldMore";
import { SortConfig, SortDirection } from "@/types/sorting";
import { Pagination } from "@nextui-org/react";
import React, { useEffect, useRef } from "react";

interface Column<T> {
  name: string;
  uuid: keyof T | "actions";
  align?: Align;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
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
  isLoading?: boolean;
  loadingContent?: React.ReactNode;
  onSort?: (field: keyof T) => void;
  sortConfig?: SortConfig;
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
  isLoading = false,
  loadingContent = "Cargando...",
  onSort,
  sortConfig,
}: GenericTableProps<T>) {
  const lastValidData = useRef<T[]>([]);

  useEffect(() => {
    if (data.length > 0) {
      lastValidData.current = data;
    }
  }, [data]);

  const renderCell = React.useCallback(
    (item: T, columnKey: keyof T | "actions") => {
      const column = columns.find((col) => col.uuid === columnKey);
      return column?.render
        ? column.render(item)
        : (item[columnKey as keyof T] as unknown as React.ReactNode);
    },
    [columns]
  );

  const renderPagination = () =>
    !error &&
    data.length > 0 &&
    showPagination && (
      <div className="flex w-full justify-start">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={currentPage + 1}
          total={totalPages}
          onChange={(page) => onPageChange?.(page - 1)}
          size="lg"
        />
      </div>
    );

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-2">
        <div className="overflow-x-auto">
          <table className="w-full min-w-full border-collapse">
            <thead>
              <tr className="rounded-t-lg">
                {columns.map((column) => (
                  <th
                    key={String(column.uuid)}
                    className={`
                    p-4 whitespace-nowrap border-b
                    ${column.sortable ? "cursor-pointer" : ""}
                    ${column === columns[0] ? "rounded-tl-lg" : ""}
                    ${
                      column === columns[columns.length - 1]
                        ? "rounded-tr-lg"
                        : ""
                    }
                    ${
                      column.align === Align.CENTER
                        ? "text-center"
                        : "text-left"
                    }
                  `}
                    onClick={() => {
                      if (column.sortable && onSort) {
                        onSort(column.uuid as keyof T);
                      }
                    }}
                  >
                    <div
                      className={`flex items-center ${
                        column.align === Align.CENTER
                          ? "justify-center"
                          : sortConfig
                          ? "justify-between"
                          : "justify-start"
                      }`}
                    >
                      {column.name}
                      {column.sortable && (
                        <span className="ml-2">
                          {sortConfig?.field === column.uuid ? (
                            sortConfig.direction === SortDirection.ASC ? (
                              <ArrowUp />
                            ) : (
                              <ArrowDown />
                            )
                          ) : (
                            <UnfoldMore />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {error ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center p-20 text-red-400 font-semibold"
                  >
                    {errorMessage}
                  </td>
                </tr>
              ) : isLoading &&
                !data.length &&
                lastValidData.current.length > 0 ? (
                // Usar datos en caché durante la carga si existen
                lastValidData.current.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50 last:border-b-0 transition-opacity duration-200 opacity-50"
                  >
                    {columns.map((column) => (
                      <td
                        key={String(column.uuid)}
                        className={`p-4 whitespace-nowrap ${
                          column.align === Align.CENTER
                            ? "text-center"
                            : column.align === Align.END
                            ? "text-right"
                            : "text-left"
                        }`}
                      >
                        {renderCell(item, column.uuid)}
                      </td>
                    ))}
                  </tr>
                ))
              ) : data.length > 0 ? (
                // Mostrar datos actuales
                data.map((item) => (
                  <tr
                    key={item.id}
                    className={`hover:bg-gray-50 last:border-b-0 transition-opacity duration-200 ${
                      isLoading ? "opacity-50" : ""
                    }`}
                  >
                    {columns.map((column) => (
                      <td
                        key={String(column.uuid)}
                        className={`p-4 whitespace-nowrap ${
                          column.align === Align.CENTER
                            ? "text-center"
                            : column.align === Align.END
                            ? "text-right"
                            : "text-left"
                        }`}
                      >
                        {renderCell(item, column.uuid)}
                      </td>
                    ))}
                  </tr>
                ))
              ) : isLoading ? (
                // Solo mostrar loading cuando no hay datos ni caché
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center p-20 text-gray-500 font-semibold"
                  >
                    {loadingContent}
                  </td>
                </tr>
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center p-20 text-gray-500"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="px-3 py-4">{renderPagination()}</div>
    </div>
  );
}
