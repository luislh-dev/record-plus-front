import { ActionsCell } from '@/components/ActionsCell';
import { GenericTable } from '@/components/GenericTable';
import { Align } from '@/constants/align';
import { useHandleSortGeneric } from '@/hooks/useHandleSort';
import { TableColumn } from '@/types/TableColumn';
import { useNavigate } from 'react-router-dom';
import { usePersonSearch } from '../hooks/usePersonSearch';
import { useSearchPeopleStore } from '../stores/useSearchStore';
import { MainPeopleListDto } from '../types/MainPeopleListDto';

export const PeopleList = () => {
  const navigate = useNavigate();
  const { setPage, sortConfig, setSortConfig } = useSearchPeopleStore();
  const { getNewSortConfig } = useHandleSortGeneric(sortConfig);
  const { peoples, isLoading, error, pagination } = usePersonSearch();

  const columns: TableColumn<MainPeopleListDto>[] = [
    {
      name: 'dni',
      key: 'documentNumber',
      sortable: true
    },
    {
      name: 'Nombre',
      key: 'fullName'
    },
    {
      name: 'Total de visitas',
      key: 'totalVisits',
      align: Align.CENTER
    },
    {
      name: 'Última visita',
      key: 'lastVisitDate',
      align: Align.CENTER
    },
    {
      name: 'Hospital',
      key: 'lastVisitHospitalName'
    },
    {
      name: 'Acciones',
      key: 'actions',
      align: Align.CENTER,
      render: (people: MainPeopleListDto) => (
        <ActionsCell onDetail={() => navigate(`/people/${people.id}/detail`)} />
      )
    }
  ];

  return (
    <>
      <GenericTable
        columns={columns}
        data={peoples}
        isLoading={isLoading}
        error={error?.message}
        emptyMessage="No se encontraron personas"
        loadingContent="Cargando personas..."
        totalPages={pagination.totalPages}
        currentPage={pagination.currentPage}
        onPageChange={setPage}
        onSort={field => setSortConfig(getNewSortConfig(field as keyof MainPeopleListDto))}
        sortConfig={sortConfig}
      />
    </>
  );
};
