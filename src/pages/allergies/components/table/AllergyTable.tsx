import { ActionsCell } from '@/components/ActionsCell';
import { Align } from '@/constants/align';
import { statusColorMap } from '@/constants/statusColorMap';
import { sortDescriptorMapper, sortMapper } from '@/mapper/SortMapper';
import type { TableColumnBase } from '@/types/TableColumn';
import {
  Chip,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react';
import type React from 'react';
import { useAllergiesSearch } from '../../hooks/useAllergiesSearch';
import { useSearchStore } from '../../stores/searchStore';
import { TopContent } from './TopContent';

const columns: TableColumnBase[] = [
  {
    name: 'Codigo',
    uid: 'code',
    sortable: true,
  },
  {
    name: 'Nombre',
    uid: 'name',
    sortable: true,
  },
  {
    name: 'Categoría',
    uid: 'category',
  },
  {
    name: 'Estado',
    uid: 'status',
  },
  {
    name: 'Acciones',
    uid: 'actions',
    align: Align.CENTER,
  },
];

export function AllergyTable() {
  const { allergies, isLoading, pagination, isFetching, isPlaceholderData } = useAllergiesSearch();
  const { setPage, sortConfig, setSortConfig } = useSearchStore();

  type Allergy = (typeof allergies)[0];

  const renderCell = (allergy: Allergy, column: React.Key) => {
    const cellValue = allergy[column as keyof Allergy];
    switch (column) {
      case 'status':
        return (
          <Chip color={statusColorMap[cellValue]} size='sm' variant='flat'>
            {cellValue}
          </Chip>
        );
      case 'actions':
        return <ActionsCell />;
      default:
        return cellValue;
    }
  };

  const bottomContent = (
    <>
      {allergies.length > 0 && (
        <Pagination
          isCompact
          showControls
          onChange={(e) => setPage(e - 1)}
          total={pagination.totalPages}
          page={pagination.currentPage}
        />
      )}
    </>
  );

  const loadingState = isLoading || (isFetching && isPlaceholderData) ? 'loading' : 'idle';

  return (
    <Table
      classNames={{
        wrapper: 'max-h-[calc(100vh-16rem)]',
      }}
      isHeaderSticky
      aria-label='Tabla de alergias'
      topContentPlacement='outside'
      topContent={TopContent(pagination.totalElements)}
      bottomContentPlacement='outside'
      bottomContent={bottomContent}
      sortDescriptor={sortDescriptorMapper(sortConfig)}
      onSortChange={(e) => setSortConfig(sortMapper(e))}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn allowsSorting={column.sortable} key={column.uid} align={column.align}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={allergies} isLoading={isLoading} loadingState={loadingState} loadingContent={<Spinner />}>
        {(allergy) => (
          <TableRow key={allergy.id}>{(key) => <TableCell>{renderCell(allergy, key)}</TableCell>}</TableRow>
        )}
      </TableBody>
    </Table>
  );
}
