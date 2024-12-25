import { GenericTable } from '@/components/GenericTable';
import { Align } from '@/constants/align';
import { useHandleSortGeneric } from '@/hooks/useHandleSort';
import { TableColumn } from '@/types/TableColumn';
import { usePersonSearch } from '../hooks/usePersonSearch';
import { useSearchPeopleStore } from '../stores/useSearchStore';
import { MainPeopleListDto } from '../types/MainPeopleListDto';

export const PeopleList = () => {
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
