import { ArrowDown } from '@/icons/ArrowDown';
import { ArrowUp } from '@/icons/ArrowUp';
import { FilterList } from '@/icons/FIlterList';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  type SortDescriptor,
} from '@heroui/react';
import type { Key } from 'react';
import { HOSPITAL_SORTABLE_FIELDS } from '../constants/sortableFields';
import { useSearchStore } from '../stores/searchStore';

export function DropDownSort() {
  const { sortDescriptor, setSortDescriptor } = useSearchStore();

  const handleSortChange = (key: Key) => {
    const newSortDescriptor: SortDescriptor = {
      column: key.toString(),
      direction:
        sortDescriptor.column === key
          ? sortDescriptor.direction === 'ascending'
            ? 'descending'
            : 'ascending'
          : 'ascending',
    };
    setSortDescriptor(newSortDescriptor);
  };

  const endContent = (field: string) => {
    if (field !== sortDescriptor.column) {
      return null;
    }

    return sortDescriptor.direction === 'ascending' ? (
      <ArrowUp size={16} />
    ) : (
      <ArrowDown size={16} />
    );
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button aria-label='Clasificar' startContent={<FilterList />}>
          Ordenar
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        closeOnSelect={false}
        selectedKeys={[sortDescriptor.column]}
        onAction={handleSortChange}
      >
        {Object.values(HOSPITAL_SORTABLE_FIELDS).map((sort) => (
          <DropdownItem key={sort.field} endContent={endContent(sort.field)}>
            {sort.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
