import { ActionsCell } from '@/components/ActionsCell';
import { statusColorMap } from '@/constants/statusColorMap';
import { sortDescriptorMapper, sortMapper } from '@/mapper/SortMapper';
import { SearchImput } from '@/pages/hospital/components/Search';
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
import { useUserSearch } from '../hooks/useUserSearch';
import { useUserSearchStore } from '../stores/searchStore';
import { DropDownFilter } from './DropDownFilter';
import { Header } from './Header';

const columns: TableColumnBase[] = [
  {
    name: 'Nombre',
    uid: 'username',
    sortable: true,
  },
  {
    name: 'Correo electrónico',
    uid: 'email',
    sortable: true,
  },
  {
    name: 'DNI',
    uid: 'dni',
    sortable: true,
  },
  {
    name: 'Hospital',
    uid: 'hospital',
    sortable: true,
  },
  {
    name: 'Roles',
    uid: 'roles',
  },
  {
    name: 'Estado',
    uid: 'state',
  },
  {
    name: 'Acciones',
    uid: 'actions',
  },
];

type HospitalTableProps = {
  onDelete: (id: string) => void;
};

const topContent = (totalElements: number) => (
  <div className='flex flex-col gap-y-3'>
    <Header total={totalElements} />
    <search className='flex'>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className='flex gap-x-4'>
          <SearchImput />
          <div className='flex gap-x-4' aria-label='Filtros y ordenamiento'>
            <DropDownFilter />
          </div>
        </div>
      </form>
    </search>
  </div>
);

export function UserTable({ onDelete }: HospitalTableProps) {
  const { users, pagination, isLoading, isPlaceholderData, isFetching } = useUserSearch();
  const { setPage, sortConfig, setSortConfig } = useUserSearchStore();

  type User = (typeof users)[0];

  const renderCell = (user: User, column: React.Key) => {
    const cellValue = user[column as keyof User];
    switch (column) {
      case 'state': {
        const value = Array.isArray(cellValue) ? cellValue.join(', ') : cellValue;
        return (
          <Chip color={statusColorMap[value] || 'default'} variant='flat' size='sm'>
            {value}
          </Chip>
        );
      }
      case 'actions':
        return <ActionsCell onDelete={() => onDelete(user.id)} state={user.state} />;
      default:
        return cellValue;
    }
  };

  const bottomContent = (
    <>
      {users.length > 0 && (
        <Pagination
          isCompact
          showControls
          showShadow
          total={pagination.totalPages}
          page={pagination.currentPage}
          onChange={setPage}
        />
      )}
    </>
  );

  const loadingState = isLoading ? 'loading' : isFetching && isPlaceholderData ? 'loading' : 'idle';

  return (
    <Table
      classNames={{
        wrapper: 'max-h-[calc(100vh-16rem)]',
      }}
      isHeaderSticky
      topContentPlacement='outside'
      topContent={topContent(pagination.totalElements)}
      bottomContentPlacement='outside'
      bottomContent={bottomContent}
      sortDescriptor={sortDescriptorMapper(sortConfig)}
      onSortChange={(e) => setSortConfig(sortMapper(e))}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            allowsSorting={column.sortable}
            align={column.uid === 'actions' ? 'center' : 'start'}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={users}
        isLoading={isLoading}
        loadingState={loadingState}
        loadingContent={<Spinner />}
      >
        {(user) => (
          <TableRow key={user.id}>
            {(key) => <TableCell>{renderCell(user, key)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
