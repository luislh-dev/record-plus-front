import { useHandleSort } from '@/hooks/useHandleSort';
import { ArrowDown } from '@/icons/ArrowDown';
import { ArrowUp } from '@/icons/ArrowUp';
import { FilterList } from '@/icons/FIlterList';
import { SortDirection } from '@/types/sorting';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import type { Key } from 'react';
import { HOSPITAL_SORTABLE_FIELDS } from '../constants/sortableFields';
import { useSearchStore } from '../stores/searchStore';

export function DropDownSort() {
  const { sortConfig, setSortConfig } = useSearchStore();
  const { getNewSortConfig } = useHandleSort(sortConfig);

  const handleAction = (key: Key) => {
    setSortConfig(getNewSortConfig(key.toString()));
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button aria-label='Clasificar' startContent={<FilterList />}>
          Ordenar
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        variant='faded'
        disallowEmptySelection
        selectedKeys={new Set([sortConfig.field])}
        onAction={handleAction}
        closeOnSelect={false}
      >
        {Object.values(HOSPITAL_SORTABLE_FIELDS).map((field) => (
          <DropdownItem
            key={field.field}
            textValue={field.field}
            aria-label={`ordenar por ${field.label.toLowerCase()}`}
            endContent={
              sortConfig.field === field.field ? (
                sortConfig.direction === SortDirection.ASC ? (
                  <ArrowUp />
                ) : (
                  <ArrowDown />
                )
              ) : null
            }
          >
            {field.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
