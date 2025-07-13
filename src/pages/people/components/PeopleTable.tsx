import { ActionsCell } from '@/components/ActionsCell';
import { Align } from '@/constants/align';
import { sortDescriptorMapper, sortMapper } from '@/mapper/SortMapper';
import type { TableColumnBase } from '@/types/TableColumn';
import { Pagination, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';
import { useNavigate } from 'react-router-dom';
import { usePersonSearch } from '../hooks/usePersonSearch';
import { useSearchPeopleStore } from '../stores/useSearchStore';
import { DropDownFilter } from './DropDownFilter';
import { HeaderList } from './HeaderList';
import { Search } from './Search';

const columns: TableColumnBase[] = [
  {
    name: 'dni',
    uid: 'documentNumber',
    sortable: true,
  },
  {
    name: 'Nombre',
    uid: 'fullName',
  },
  {
    name: 'Total de visitas',
    uid: 'totalVisits',
  },
  {
    name: 'Última visita',
    uid: 'lastVisitDate',
  },
  {
    name: 'Hospital',
    uid: 'lastVisitHospitalName',
  },
  {
    name: 'Acciones',
    uid: 'actions',
    align: Align.CENTER,
  },
];

const topContent = (totalElements: number) => (
  <div className='flex flex-col gap-y-3'>
    <HeaderList total={totalElements} />
    <search className='flex'>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className='flex gap-x-4'>
          <Search />
          <div className='flex gap-x-4' aria-label='Filtros y ordenamiento'>
            <DropDownFilter />
          </div>
        </div>
      </form>
    </search>
  </div>
);

export function PeopleTable() {
  const { peoples, isLoading, pagination, isFetching, isPlaceholderData } = usePersonSearch();
  const { setPage, sortConfig, setSortConfig } = useSearchPeopleStore();

  const navigate = useNavigate();

  const navigateDetail = (id: string) => {
    navigate(`/people/${id}/detail`);
  };

  type People = (typeof peoples)[0];

  const renderCell = (people: People, column: React.Key) => {
    if (column === 'actions') {
      return <ActionsCell onDetail={() => navigateDetail(people.id)} />;
    }

    const cellValue = people[column as keyof People];
    return cellValue;
  };

  const bottomContent = (
    <>
      {peoples.length > 0 && (
        <Pagination
          isCompact
          showControls
          showShadow
          total={pagination.totalPages}
          page={pagination.currentPage + 1}
          onChange={(e) => setPage(e - 1)}
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
      topContentPlacement='outside'
      topContent={topContent(pagination.totalElements)}
      bottomContentPlacement='outside'
      bottomContent={bottomContent}
      sortDescriptor={sortDescriptorMapper(sortConfig)}
      onSortChange={(e) => setSortConfig(sortMapper(e))}
      aria-label='Tabla de personas'
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn allowsSorting={column.sortable} key={column.uid} align={column.align}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={peoples} isLoading={isLoading} loadingState={loadingState} loadingContent={<Spinner />}>
        {(people) => <TableRow key={people.id}>{(key) => <TableCell>{renderCell(people, key)}</TableCell>}</TableRow>}
      </TableBody>
    </Table>
  );
}
