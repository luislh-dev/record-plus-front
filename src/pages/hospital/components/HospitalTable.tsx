import { ActionsCell } from '@/components/ActionsCell';
import { State } from '@/constants/state';
import { statusColorMap } from '@/constants/statusColorMap';
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
import { useNavigate } from 'react-router-dom';
import { useHospitalSearch } from '../hooks/useHospitalSearch';
import { useSearchStore } from '../stores/searchStore';
import { DropDownSort } from './DropDownSort';
import { DropDownFilter } from './DropDrownFilter';
import { Header } from './Header';
import { SearchImput } from './Search';

const columns: TableColumnBase[] = [
  {
    name: 'Nombre',
    uid: 'name',
    sortable: true,
  },
  {
    name: 'Teléfono',
    uid: 'phone',
    sortable: true,
  },
  {
    name: 'Correo electrónico',
    uid: 'email',
    sortable: true,
  },
  {
    name: 'RUC',
    uid: 'ruc',
    sortable: true,
  },
  {
    name: 'Estado',
    uid: 'stateName',
  },
  {
    name: 'Acciones',
    uid: 'actions',
  },
];

const topContent = (totalElements: number) => (
  <div className='flex flex-col gap-y-3'>
    <Header totalHospitals={totalElements} />
    <search className='flex'>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className='flex gap-x-4'>
          <SearchImput />
          <div className='flex gap-x-4' aria-label='Filtros y ordenamiento'>
            <DropDownFilter />
            <DropDownSort />
          </div>
        </div>
      </form>
    </search>
  </div>
);

type HospitalTableProps = {
  onDelete: (id: number) => void;
};

export function HospitalTable({ onDelete }: HospitalTableProps) {
  const navigate = useNavigate();

  const { hospitals, isLoading, pagination, isPlaceholderData, isFetching } = useHospitalSearch();
  const { setPage, sortDescriptor, setSortDescriptor } = useSearchStore();

  type Hospital = (typeof hospitals)[0];

  const renderCell = (hospital: Hospital, columnKey: React.Key) => {
    const cellValue = hospital[columnKey as keyof Hospital];
    switch (columnKey) {
      case 'stateName':
        return (
          <Chip className='capitalize' color={statusColorMap[cellValue] || 'default'} size='sm' variant='flat'>
            {cellValue}
          </Chip>
        );
      case 'actions':
        return (
          <ActionsCell
            onEdit={() => navigate(`/hospitals/${hospital.id}/edit`)}
            onDelete={() => onDelete(hospital.id)}
            state={hospital.stateName}
            inactiveStates={[State.ELIMINADO, State.INACTIVO]}
          />
        );
      default:
        return cellValue;
    }
  };

  const bottomContent = (
    <div>
      {hospitals.length > 0 && (
        <Pagination
          isCompact
          showControls
          showShadow
          total={pagination.totalPages}
          page={pagination.currentPage}
          onChange={setPage}
        />
      )}
    </div>
  );

  const loadingState = isLoading || (isFetching && isPlaceholderData) ? 'loading' : 'idle';

  return (
    <Table
      isHeaderSticky
      classNames={{
        wrapper: 'max-h-[calc(100vh-16rem)]',
      }}
      topContent={topContent(pagination.totalElements)}
      topContentPlacement='outside'
      bottomContent={bottomContent}
      bottomContentPlacement='outside'
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
      aria-label='Tabla de hospitales'
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
      <TableBody items={hospitals} isLoading={isLoading} loadingState={loadingState} loadingContent={<Spinner />}>
        {(hospital) => (
          <TableRow key={hospital.id}>
            {(columnKey) => <TableCell>{renderCell(hospital, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
