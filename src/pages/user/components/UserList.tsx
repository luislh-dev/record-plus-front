import { ActionsCell } from '@/components/ActionsCell';
import { GenericTable } from '@/components/GenericTable';
import { Align } from '@/constants/align';
import { State } from '@/constants/state';
import { statusColorMap } from '@/constants/statusColorMap';
import { useHandleSortGeneric } from '@/hooks/useHandleSort';
import type { TableColumn } from '@/types/TableColumn';
import { Chip } from '@heroui/react';
import { useUserSearch } from '../hooks/useUserSearch';
import { useUserSearchStore } from '../stores/searchStore';
import type { UserListDTO } from '../types/UserListDTO';

interface UserListProps {
  onDelete: (id: string) => void;
}

export const UserList = ({ onDelete }: UserListProps) => {
  const { setPage, sortConfig, setSortConfig } = useUserSearchStore();
  const { getNewSortConfig } = useHandleSortGeneric(sortConfig);
  const { users, isLoading, error, pagination } = useUserSearch();

  const columns: TableColumn<UserListDTO>[] = [
    {
      name: 'Nombre',
      key: 'username',
      sortable: true,
    },
    {
      name: 'Correo electrónico',
      key: 'email',
      sortable: true,
    },
    {
      name: 'DNI',
      key: 'dni',
      sortable: true,
    },
    {
      name: 'Hospital',
      key: 'hospital',
      sortable: true,
    },
    {
      name: 'Roles',
      key: 'roles',
    },
    {
      name: 'Estado',
      key: 'state',
      align: Align.CENTER,
      render: (hospital: UserListDTO) => (
        <Chip
          className='capitalize'
          color={statusColorMap[hospital.state] || 'default'}
          size='sm'
          variant='flat'
        >
          {hospital.state}
        </Chip>
      ),
    },
    {
      name: 'Acciones',
      key: 'actions',
      render: (user: UserListDTO) => (
        <ActionsCell
          state={user.state}
          onEdit={(): void => {
            throw new Error('Function not implemented.');
          }}
          onDelete={() => onDelete(user.id)}
          inactiveStates={[State.INACTIVO, State.ELIMINADO]}
        />
      ),
    },
  ];

  return (
    <>
      <GenericTable
        columns={columns}
        data={users}
        isLoading={isLoading}
        error={error?.message}
        emptyMessage='No se encontraron usuarios'
        loadingContent='Cargando usuarios...'
        totalPages={pagination.totalPages}
        currentPage={pagination.currentPage}
        onPageChange={setPage}
        onSort={(field) => setSortConfig(getNewSortConfig(field as keyof UserListDTO))}
        sortConfig={sortConfig}
      />
    </>
  );
};
